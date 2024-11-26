const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");
const uuid = require("uuid");

// set key and endpoint from .env to keep resource private
const key = process.env.AZURE_FORM_RECOGNISER_KEY;
const endpoint = process.env.AZURE_FORM_RECOGNISER_ENDPOINT;

// Validates whether Recogniser captured the value and sets to 0 for user to edit if undefined so that calculations can still be made

function checkIsDefined(value) {
  if (value == undefined) {
    return 0;
  } else {
    if (typeof value == "string") {
      value = parseFloat(value.replace(/[^.0-9]/gi, ""));
    }

    return value;
  }
}

async function scanBillFormRecognizer(invoiceUrl, fileName) {
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  const poller = await client.beginAnalyzeDocument(
    "prebuilt-invoice",
    invoiceUrl
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  if (result) {
    const invoice = result.fields;

    // Read the bill and save results to meaningful variables
    let scannedBill = {
      id: uuid.v4(),
      fileName: fileName,
      customerName: invoice.CustomerName?.content.replace(/[0-9]/g, ""),
      customerAddress: invoice.CustomerAddress?.content,
      postcode: invoice.CustomerAddress?.content.slice(-4),
      providerName: invoice.RemittanceAddressRecipient?.content,
      providerAbn: invoice.VendorTaxId?.content,
      startDate: new Date(
        invoice.ServiceStartDate?.content.replace(/[^A-Z0-9]/gi, "")
      ).toLocaleDateString("en-GB"),
      endDate: new Date(
        invoice.ServiceEndDate?.content.replace(/[^A-Z0-9]/gi, "")
      ).toLocaleDateString("en-GB"),
      billTotalCost: parseFloat(
        invoice.AmountDue?.content.replace(/[^.0-9]/gi, "")
      ),
      dailySupplyCharge: null,
      dailySupplyUsage: null,
      peakCharge: null,
      peakUsage: null,
      // The below variables are known charges for bills however we have been unable to find bills to use which have these variable present to pull from.
      // Are just placeholders for variables which are liklely to be present in some bills moving forward:
      offPeakCharge: null,
      offPeakUsage: null,
      shoulderCharge: null,
      shoulderUsage: null,
      controlledLoadCharge: null,
      controlledLoadUsage: null,
    };

    // Iterate through tables on the PDF and categorise values accordingly
    try {
      for (const { properties: item } of invoice.Items?.values ?? []) {
        // Supply Charge and Daily charge terminology used to find the daily cost for running the service.
        if (
          item.Description?.content.toUpperCase() == "SUPPLY CHARGE" ||
          item.Description?.content.toUpperCase() == "DAILY CHARGE"
        ) {
          scannedBill.dailySupplyCharge = checkIsDefined(
            item.UnitPrice?.content
          );
          scannedBill.dailySupplyUsage = checkIsDefined(item.Quantity?.content);

          totalCostPerDay =
            scannedBill.dailySupplyCharge * scannedBill.dailySupplyUsage;
        }
        // Peak and All usage are terminology used to find the cost per KW for running the service.
        else if (
          item.Description?.content.toUpperCase() == "PEAK" ||
          item.Description?.content.toUpperCase() == "ALL USAGE"
        ) {
          scannedBill.peakCharge = checkIsDefined(item.UnitPrice?.content);

          scannedBill.peakUsage = checkIsDefined(item.Quantity?.content);

          totalKwCost = checkIsDefined(
            scannedBill.peakCharge * scannedBill.peakUsage
          );
        }
      }

      // Validates whether Recogniser captured the value and sets to 0 for user to edit if undefined so that calculations can still be made

      netCost = checkIsDefined(totalCostPerDay + totalKwCost);
      totalDiscount = checkIsDefined(netCost - scannedBill.billTotalCost);

      return scannedBill;
    } catch {
      return "Could not detect valid input. Please ensure the uploaded bill contains cost breakdown information and is no more than 2 pages long.";
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

module.exports = { scanBillFormRecognizer, checkIsDefined };
