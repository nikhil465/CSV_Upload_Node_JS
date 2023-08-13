// models/csvData.js

const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    data: [{}],
  },
  { strict: false }
);
const CsvData = mongoose.model("CsvData", csvSchema);

module.exports = CsvData;
