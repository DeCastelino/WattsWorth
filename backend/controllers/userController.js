const { unlinkAsync } = require("../middleware/multer.js");
const bcrypt = require("bcrypt");
const { uploadFile } = require("../azure-storage-blob.js");
const { scanBillFormRecognizer } = require("../form-recognizer.js");
const {
    providerPlanFormRecognizer,
} = require("../provider-plan-recognizer.js");
const { comparisonLogic } = require("../comparison.js");
const {
    container,
    retailerContainer,
    userContainer,
    feedbackContainer,
} = require("../db.js");

const upload_image = async (req, res) => {
    // If file is invalid
    if (req.file === undefined) res.sendStatus(404);

    // Create a checking system to check file extensions using the already existing function.
    const destFileName = req.file.filename;

    // Uploading file to google cloud storage and fetching public URL
    const publicURL = await uploadFile(destFileName).catch(console.error);

    await unlinkAsync(req.file.path).then(() => {
        return res.status(200).json({ publicURL });
    });
};

const scan_bill = async (req, res) => {
    const url = req.body.blobFileURL;
    const fileName = req.body.fileName;
    const scannedBillData = await scanBillFormRecognizer(url, fileName);
    res.status(200).json({ scannedBillData });
};

const scan_retailer_plan = async (req, res) => {
    const url = req.body.blobFileURL;
    const scannedRetailerPlanData = await providerPlanFormRecognizer(url);
    res.status(200).json({ scannedRetailerPlanData });
};

const compare_plans = async (req, res) => {
    let userBill;
    const fileId = req.body.selectedBill;
    const guest_userBill = req.body.userBill;
    const retailerPlans = [];
    //Extract the details of selected user bill from database
    // logged in user wont have providerName in the object
    if (guest_userBill === undefined) {
        try {
            const { resources } = await container.items
                .query({
                    query: "SELECT * from ScannedForm WHERE ScannedForm.id = @id",
                    parameters: [{ name: "@id", value: fileId }],
                })
                .fetchAll();
            userBill = resources[0];
        } catch (err) {
            console.log(err);
        }
    } else {
        guest_userBill.billTotalCost = parseFloat(guest_userBill.billTotalCost);
        guest_userBill.dailySupplyCharge = parseFloat(
            guest_userBill.dailySupplyCharge
        );
        guest_userBill.dailySupplyUsage = parseFloat(
            guest_userBill.dailySupplyUsage
        );
        guest_userBill.peakCharge = parseFloat(guest_userBill.peakCharge);
        guest_userBill.peakUsage = parseFloat(guest_userBill.peakUsage);
        userBill = guest_userBill;
    }
    //Extract all the retailers plans details from database
    try {
        const { resources } = await retailerContainer.items
            .query({
                query: "SELECT * from RetailerScanPlan",
            })
            .fetchAll();
        resources.forEach((resource) => {
            retailerPlans.push(resource);
        });
    } catch (err) {
        console.log(err);
    }
    //Running Compare function
    try {
        const { userDetail, top5Plans } = await comparisonLogic(
            userBill,
            retailerPlans
        );
        return res.status(200).json({ userDetail, top5Plans });
    } catch (err) {
        console.log("Error Comparison:-", err);
    }
};

const insert_data = async (req, res) => {
    // Saving scanned file meta data to blob storage (ScannedForm)
    container.items
        .create(req.body.scannedFileData)
        .then(async (res) => {
            // add scanned file metadata to user database
            const { resources } = await userContainer.items
                .query({
                    query: "SELECT * from Users WHERE Users.id = @id",
                    parameters: [{ name: "@id", value: req.body.userId }],
                })
                .fetchAll();
            if (!resources[0].hasOwnProperty("userBills")) {
                resources[0].userBills = [];
            }
            const userBill = {
                fileName: req.body.scannedFileData.fileName,
                fileId: req.body.scannedFileData.id,
            };
            resources[0].userBills.push(userBill);
            await userContainer.item(req.body.userId).replace(resources[0]);
            // return res.status(200).json("OK");
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });

    // saving filename and fileID (uuid) to blob storage (Users) (TO DO)
};

const insert_retailer_data = async (req, res) => {
    retailerContainer.items
        .create(req.body)
        .then((res) => {
            return res.status(200);
        })
        .catch((err) => {
            console.log(err);
            return res.status(400);
        });
};

// gets user bills reference for the user to choose from
const get_user_bills = async (req, res) => {
    const { resources } = await userContainer.items
        .query({
            query: "SELECT * from Users WHERE Users.id = @id",
            parameters: [{ name: "@id", value: req.query.userId }],
        })
        .fetchAll();
    return res.status(200).json({ userFiles: resources[0].userBills });
};

const save_feedback = async (req, res) => {
    feedbackContainer.items
        .create(req.body)
        .then((res) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
};

const user_login = async (req, res) => {
    try {
        const { resources } = await userContainer.items
            .query({
                query: "SELECT * FROM Users WHERE Users.email = @email",
                parameters: [
                    {
                        name: "@email",
                        value: req.body.email,
                    },
                ],
            })
            .fetchAll();
        if (resources.length === 0)
            return res.status(404).json("User email not found");
        resources.map((resource) => {
            bcrypt
                .compare(req.body.password, resource.password)
                .then((result) => {
                    if (result) {
                        delete resource.password;
                        return res.status(200).json(resource);
                    }
                    return res.status(400).json("Password doesn't match");
                });
        });
    } catch (error) {
        res.sendStatus(404);
    }
};
const user_registration = async (req, res) => {
    // check if the user with same email exists
    try {
        const { resources } = await userContainer.items
            .query({
                query: "SELECT * FROM Users WHERE Users.email = @email",
                parameters: [
                    {
                        name: "@email",
                        value: req.body.email,
                    },
                ],
            })
            .fetchAll();

        // send error if user with same email already exists
        if (resources.length !== 0) return res.sendStatus(400);
    } catch (error) {
        res.status(404).json(error);
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;

        await userContainer.items
            .create(req.body)
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
        res.status(200).json(req.body);
    } catch (error) {
        res.status(404).json(error);
    }
};

module.exports = {
    upload_image,
    scan_bill,
    insert_data,
    scan_retailer_plan,
    insert_retailer_data,
    get_user_bills,
    compare_plans,
    save_feedback,
    user_login,
    user_registration,
};
