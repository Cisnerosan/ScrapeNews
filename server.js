
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");


var request = require("request");
var cheerio = require("cheerio");

var Articles = require("./models/articles.js");
var Comments = require("./models/notes.js");

var routes = require("./controllers/article_controller.js");

dotenv.load();

mongoose.Promise = Promise;


var port = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  	extended: false
}));

app.use(express.static(process.cwd() + "/public"));

//HANDLEBARS///
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mongoConfig = process.env.MONGODB_URI || "mongodb://localhost/nprnewsscraper";
mongoose.connect(mongoConfig);

var db = mongoose.connection;

db.on("error", function(error) {
  	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  	console.log("Mongoose connection successful.");
});

app.use("/", routes);
app.listen(port, function() {
	console.log("Listening on " + port);
});








