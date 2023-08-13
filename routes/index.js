const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv_controller");

router.get("/", csvController.listCsv);
router.post("/upload", csvController.uploadCsv);
router.get("/csvdata/:id", csvController.csvData);

module.exports = router;
