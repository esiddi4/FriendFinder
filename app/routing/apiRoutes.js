// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // In each of the below cases when a user visits a link they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Submit survey data to server
    app.post('/api/friends', function (req, res) {
        // grab new user's scores to compare with friends in friendsData
        var currentUserScores = req.body["scores[]"];
        var scoresDiffArr = [];
        var bestMatchIndex = 0;
        console.log(friendsData);


        //runs through all current friends in list
        for (var i = 0; i < friendsData.length; i++) {
            var scoresDiff = 0;
            // Compare friends in friendsData with currentUser
            for (var j = 0; j < currentUserScores.length; j++) {
                var friendsIndivScores = friendsData[i]["scores[]"];
                console.log(friendsIndivScores);
                scoresDiff += (Math.abs(parseInt(friendsIndivScores[j]) - parseInt(currentUserScores[j])));
            }
            //push results into scoresDiffArr
            scoresDiffArr.push(scoresDiff);
        }

        //after all friends are compared, find best match
        for (var i = 0; i < scoresDiffArr.length; i++) {
            if (scoresDiffArr[i] <= scoresDiffArr[bestMatchIndex]) {
                bestMatchIndex = i;
            }
        }

        //return bestMatch data
        var bestMatch = friendsData[bestMatchIndex];
        res.json(bestMatch);
        //pushes new submission into the friendsData array
        friendsData.push(req.body);
    });

app.post("/api/clear", function () {
    // Empty out the arrays of data
    friendsData = [];
});

};