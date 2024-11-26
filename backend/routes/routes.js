const router = require("express").Router();
const { upload } = require("../middleware/multer.js");
const userController = require("../controllers/userController");

// GET ROUTES
router.get("/userBills", userController.get_user_bills);
router.post("/compare", userController.compare_plans);

// POST ROUTES
router.post("/login", userController.user_login);
router.post("/register", userController.user_registration);
router.post("/upload", upload.single("file"), userController.upload_image);
router.post("/scanBill", userController.scan_bill);
router.post("/scanRetailerPlan", userController.scan_retailer_plan);
router.post("/insertData", userController.insert_data);
router.post("/insertRetailerData", userController.insert_retailer_data);
router.post("/feedback", userController.save_feedback);

// DELETE ROUTES

module.exports = router;
