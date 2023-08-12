const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv_controller");

router.get("/", homeController.home);

module.exports = router;
