var keysReference = require('./keys.js');
var nodeArg = process.argv;
var inputA = nodeArg[2];
var inputB = "";
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require("fs");

for (var i = 3; i < process.argv.length; i++){
  inputB = inputB + " " + process.argv[i];
}




var GetMyTweets = function() {
	var client = new Twitter({
	 	consumer_key : keysReference.twitterKeys.consumer_key,
	 	consumer_secret : keysReference.twitterKeys.consumer_secret,
	 	access_token_key : keysReference.twitterKeys.access_token_key,
		access_token_secret : keysReference.twitterKeys.access_token_secret
	});

	if (inputA == "my-tweets") {
	   var params = {screen_name: 'PendyalaVinesh'};
	    }
	    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	      if (!error) {
	        for (var i = 0; i < 20; i++) { 
	        console.log("Tweet: " + tweets[i].text + "\n" + "Created: " + tweets[i].created_at + "\n"); 
	        }
	      };
	    });
}

var GetArtistNames = function(artist) {
	return artist.name;
}
var GetMeSpotify = function(songName) {
//spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
  spotify.search({ type: 'track', query: songName }, function(err, data) {

    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	var songs = data.tracks.items;
 	for(var i = 0; i < songs.length; i++) {
 		console.log(i);
 		console.log('artist(s): ' + songs[i].artists.map(GetArtistNames));
 		console.log('song name: ' + songs[i].name);
 		console.log('previews song: ' + songs[i].preview_url); 
 		console.log('-------------------------------------------');
 	}
});
}

var GetMeMovie = function(movieName) {
	request('http://www.omdbapi.com/?i=tt3896198&apikey=2d05e865' + movieName + '&y=&plot=short&r=json', function (error, response, body){
		if(!error && response.statusCode == 200) {
			
			var jsonData = JSON.parse(body); 

			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Language: ' + jsonData.Language);
			console.log('Plot: ' + jsonData.Plot);
			console.log('Actors: ' + jsonData.Actors);
			console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
			console.log('Rotten tomatoes rating: ' + jsonData.tomatoURL);
		}
	});
}

var doWhatItSays = function(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err) throw err;

		var dataArr = data.split(',');

		if(dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length == 1) {
			pick(dataArr[0]);
		}
	});
}


var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			GetMyTweets();
			break;
		case 'spotify-this-song': 
			GetMeSpotify(functionData);
			break;
		case 'movie-this':
			GetMeMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);