const {
    AzureKeyCredential,
    DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

async function providerPlanFormRecognizer(planURL) {
    const endpoint = process.env.AZURE_FORM_RECOGNISER_ENDPOINT;
    const credential = new AzureKeyCredential(
        process.env.AZURE_FORM_RECOGNISER_KEY
    );
    const client = new DocumentAnalysisClient(endpoint, credential);

    const modelId = process.env.AZURE_FORM_RECOGNISER_PROVIDER_MODEL;

    const poller = await client.beginAnalyzeDocument(modelId, planURL);

    const {
        documents: [document],
    } = await poller.pollUntilDone();

    if (!document) {
        throw new Error("Expected at least one document in the result.");
    }

    const offerDetails = document.fields.OfferDetails.properties["Details"];
    const fees = {};
    const contractDetails = {};

    let scannedPlan = {
        provider: document.fields.providerName?.content,
        id: document.fields.planId?.content,
        providerWebsite: document.fields.providerWebsite?.content,
        billFrequency: document.fields.billFrequency?.content,

        distributor: offerDetails.properties["Distributor"].content,
        offerType: offerDetails.properties["Offer Type"].content,
        fuelType: offerDetails.properties["FuelType"].content,
        customerType: offerDetails.properties["CustomerType"].content,
        releaseDate: offerDetails.properties["ReleaseDate"].content,
        expiryDate: offerDetails.properties["ExpiryDate"].content,

        peakCharge: checkIsDefined(document.fields.PeakConsumption?.content),
        dailySupplyCharge: checkIsDefined(
            document.fields.DailySupplyCharge?.content
        ),
        shoulderCharge: checkIsDefined(document.fields.ShoulderCharge?.content),
        offPeakCharge: checkIsDefined(
            document.fields.OffPeakConsumption?.content
        ),
        controlledLoadCharge: checkIsDefined(
            document.fields.ControlledLoadCharges?.content
        ),
        contractDetails: contractDetails,
        fees: fees,
    };

    // Each for loop pulls data from table and casts to a map to easily draw key value pair info.

    // Contract Details Table
    try {
        for (
            let index = 0;
            index < document.fields.ContractDetails.values.length;
            index++
        ) {
            const contractName = document.fields.ContractDetails.values[
                index
            ].properties["Contract"].content.replace(/(\r\n|\n|\r)/gm, " ");
            const contractTerms = document.fields.ContractDetails.values[
                index
            ].properties["Details"].content.replace(/(\r\n|\n|\r)/gm, " ");
            contractDetails[contractName] = contractTerms;
        }

        // Fees Table
        for (
            let index = 0;
            index < document.fields.Fees.values.length;
            index++
        ) {
            const feesType = document.fields.Fees.values[index].properties[
                "Type"
            ].content.replace(/(\r\n|\n|\r)/gm, " ");
            const feeRate = checkIsDefined(
                document.fields.Fees.values[index].properties["Rate"].content
            );
            fees[feesType] = feeRate;
        }
        return scannedPlan;
    } catch (error) {
        console.log(
            "Could not detect valid input. Please ensure the uploaded retailer plan contains cost breakdown information and is no more than 2 pages long."
        );
    }
}

// Validates whether Recogniser captured the value and sets to 0 for user to edit if undefined so that calculations can still be made
// divide value by 100 to cast to dollars for comparison later. All plans show values in cents.
function checkIsDefined(value) {
    if (value == undefined) {
        return 0;
    } else if (typeof value == "string") {
        return parseFloat(value.replace(/[^.0-9]/gi, "") / 100);
    } else {
        return value / 100;
    }
}

module.exports = { providerPlanFormRecognizer, checkIsDefined };
