const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const db = require("./config/mongoose");
const env = require("./config/environment");
const morgan = require("morgan");

if (env.name == "production") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded({ extended: false }));

app.use(express.static(env.asset_path));

app.use(morgan(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
//make the uploads path available to the browser
app.use("./uploads", express.static(__dirname + "/uploads"));
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
