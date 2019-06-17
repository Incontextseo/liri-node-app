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

// var queryURL;
var output;
var movies;
var operand = process.argv[2]
// Store all of the arguments in an array
var nodeArgs = process.argv;

switch(operand) {
    case 'movie-this':
        // Create an empty variable for holding the movie name
        movies = "Mr+Nobody";
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movies = movies + "+" + nodeArgs[i];
        }
        else {
            movies += nodeArgs[i];
        }
    }
        // Then run a request with axios to the OMDB API with the movie specified
        queryUrl = "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=trilogy";
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        axios.get(queryUrl).then(
        function(response) {
            // * Title of the movie.
            console.log("Title: " + response.data.Title);
            // * Year the movie came out.
            console.log("Year: " + response.data.Year);
            // * IMDB Rating of the movie.
            console.log("IMBD Rating: " + response.data.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            // var ratings = JSON.stringify(response.data.Ratings.Value)
            // console.log("Rotton Tomatoes Rating: " + ratings);
            // * Country where the movie was produced.
            console.log("Country: " + response.data.Country);
            // * Language of the movie.
            console.log("Language: " + response.data.Language);
            // * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            // * Actors in the movie.
            console.log("Actors: " + response.data.Actors);
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
        break
    case 'spotify-this-song':
                 // Create an empty variable for holding the song name
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
        spotify.search({ type: 'track', query: output }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            queryUrl = data.tracks.href
            
            console.log("URL: " + queryUrl); 
            });
        break
    case 'concert-this':
         // Create an empty variable for holding the artist name
         artist = "";
         // Loop through all the words in the node argument
         // And do a little for-loop magic to handle the inclusion of "+"s
         for (var i = 3; i < nodeArgs.length; i++) {
 
         if (i > 3 && i < nodeArgs.length) {
             artist = artist + "+" + nodeArgs[i];
         }
         else {
             artist += nodeArgs[i];
         }
     }
         // Then run a request with axios to the OMDB API with the movie specified
         queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

         // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        axios.get(queryUrl).then(
        function(response) {

            for (var i = 0; i < response.data.length; i++) {
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Venue City: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            var dateTime = moment(response.data[i].datetime).format("MMM D, YYYY h:mm A")
            console.log("Concert Date & Time: " + dateTime);
            }
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
        break
    case "do-what-it-says":
        console.log("Do What It Says")
        break
    default:
        output = 'Whoops'
}



