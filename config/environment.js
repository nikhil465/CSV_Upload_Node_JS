const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  db: "csv_upload_development",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CSV_ASSET_PATH,
  db: process.env.CSV_DB,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};

module.exports =
  eval(process.env.CSV_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CSV_ENVIRONMENT);
