// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // In each of the below cases when a user visits a link they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    app.get('../api/friends', function(req, res){
        res.json(friendsData);
    });

    // API POST Requests
    // Submit survey data to server
    app.post('../api/friends'), function(req, res){
        friendsData.push(req.body);
    }

};