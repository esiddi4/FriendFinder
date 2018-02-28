// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Create an "express" server
var app = express();

// Set an initial port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// Effectively "start" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});