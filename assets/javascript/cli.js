// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Include the dotenv npm package
var dotenv = require('dotenv').config()

// Include the moment npm package
var moment = require('moment')

// Include the keys npm package
var keys = require("./keys.js");

// Include the Spotify npm pacakge
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

output = JSON.stringify(data.tracks.items[0])
 
console.log("URL: " + output); 
});

// var queryURL;
var output;
var operand = process.argv[2]
// Store all of the arguments in an array
var nodeArgs = process.argv;

switch(operand) {
    case 'movie-this':
        // Create an empty variable for holding the movie name
        output = "";
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            output = output + "+" + nodeArgs[i];
        }
        else {
            output += nodeArgs[i];
        }
    }
        // Then run a request with axios to the OMDB API with the movie specified
        queryUrl = "http://www.omdbapi.com/?t=" + output + "&y=&plot=short&apikey=trilogy";
        break
    case 'spotify-this-song':
                 // Create an empty variable for holding the movie name
        output = "";
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            output = output + "+" + nodeArgs[i];
        }
        else {
            output += nodeArgs[i];
        }
    }
            // var spotify = new Spotify(keys.spotify);
            
            // spotify.search({ type: 'track', query: "All The Small Things" }, function(err, data) {
            //     if (err) {
            //     return console.log('Error occurred: ' + err);
            //     }
            
            // console.log(data.tracks.href); 
            // queryUrl = data.tracks.href 
            // });
        break
    default:
        output = 'Whoops'
}



// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  },

  function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });