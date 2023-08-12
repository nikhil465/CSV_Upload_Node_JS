const mongoose = require("mongoose");

const csvDataSchema = new mongoose.Schema({}, { timestamps: true });

const CsvData = mongoose.model("CsvData", csvDataSchema);

module.exports = CsvData;
