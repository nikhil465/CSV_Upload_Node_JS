const CsvData = require("../models/csvData");
const multer = require("multer");
const path = require("path");

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

exports.getCsvData = async (req, res) => {
  try {
    const data = await CsvData.find();
    return res.render("index", { data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.uploadCsv = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File upload error.");
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
          await CsvData.insertMany(results);

          // Redirect back to the main page
          res.redirect("/");
        });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing CSV data.");
    }
  });
};
