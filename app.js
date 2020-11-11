require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");
var morgan = require("morgan");

var indexRouter = require("./routes/index");

const bodyParser = require("body-parser");

var app = express();

const port = process.env.PORT ? process.env.PORT : 3005;

app.use(cors());

app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

require("./routes/songs.routes")(app);

module.exports = app;
