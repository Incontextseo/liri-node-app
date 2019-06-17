// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Include the dotenv npm package
var dotenv = require('dotenv').config()

// Include the moment npm package
var moment = require('moment')

// Include the keys npm package
var keys = require("./keys.js");

// fs is a core Node package for reading and writing files
var fs = require("fs");

// Include the Spotify npm pacakge
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

// var queryURL;
var output;
var movies;
var artist;
var song = "The Sign by Ace of Base";
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
            movies="";
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
            var ratings = JSON.stringify(response.data.Ratings[1].Value)
            console.log("Rotton Tomatoes Rating: " + ratings);
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
        function spotifySong () {
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            song = song + " " + nodeArgs[i];
        }
        else {
            song = "";
            song += nodeArgs[i];
        }
    }
    console.log(song)

        spotify.search({ type: 'track', query: song}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks)
            // * Artist(s)
            var artistName = JSON.stringify(data.tracks.items[0].artists[0].name)
            console.log("Artist Name: " + artistName)
            // * The song's name
            var songName = JSON.stringify(data.tracks.items[0].name)
            console.log("Song Name: " + songName)
            // * A preview link of the song from Spotify
            var spotifyLink = JSON.stringify(data.tracks.items[0].external_urls.spotify)
            console.log("Spotify Link: " + spotifyLink)
            // * The album that the song is from
            var albumName = JSON.stringify(data.tracks.items[0].album.name)
            console.log("Artist: " + albumName)

            });
        }
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
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
          
            // We will then print the contents of data
            console.log(data);
          
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
          
            // We will then re-display the content as an array for later use.
            console.log(dataArr);

            operand = dataArr[0]
            song = dataArr[1]
            spotifySong();
          
          });
        break
    default:
        output = 'Whoops'
        console.log(output)
}



