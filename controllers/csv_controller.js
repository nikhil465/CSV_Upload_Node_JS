const CsvData = require("../models/csv_data");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");
// Set up storage and file type validation for CSV file upload
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed."));
  }
};

const upload = multer({ storage, fileFilter }).single("csvfile");

exports.listCsv = async (req, res) => {
  try {
    const csvFiles = await CsvData.find().select("filename");
    console.log(csvFiles);
    return res.render("list_csv", {
      title: "CSV Upload | List CSV",
      csvFiles: csvFiles,
    }); // Pass tableHeaders
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.csvData = async (req, res) => {
  try {
    const csvData = await CsvData.findById(req.params.id);
    const csvHeaders = Object.keys(csvData.data[0] || {});
    return res.render("list_csv", {
      title: "CSV Upload | CSV Data",
      csvData: csvData.data,
      csvHeaders: csvHeaders,
    }); // Pass tableHeaders
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.uploadCsv = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File upload error." + err);
    } else if (err) {
      return res.status(500).send("Internal Server Error.");
    }

    // Process the uploaded CSV file and save data to the database
    try {
      const filePath = req.file.path;
      const results = [];

      // Read CSV file and parse data
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          // Save CSV data to the database
          // console.log("Results : ", results);
          const tableHeaders = Object.keys(results[0] || {});

          let insertedData = await CsvData.create({
            filename: req.file.originalname,
          });
          insertedData.data.push(...results);
          insertedData.save();

          // Redirect back to the main page
          return res.redirect("/"); // Pass selectedCsv variable
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error processing CSV data.");
    }
  });
};
