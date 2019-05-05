var wins = 0;
var lossCount = 0;
var guessesLeft = 10;
var guessedLetters = [];
 
var alphabet =
    ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
    ,"r","s","t","u","v","w","x","y","z"];


var randomIndex = Math.floor(Math.random() * alphabet.length);
var computerChoice = alphabet[randomIndex];

console.log(computerChoice);

document.onkeyup = function(event) {
  var userChoice = event.key;
  var regexp = /[a-z]/gi;
    if (!regexp.test(userChoice)) {
      alert("Please enter a letter.");
    }
    else {
      console.log(userChoice);
    }

    if (guessesLeft <= 0) {
          
      document.getElementById("lossCount").innerHTML = lossCount++;
      alert("You lost!");
      guessesLeft = 10;
      guessedLetters = [];
      document.getElementById("guessedLetters").innerHTML = guessedLetters;
      document.getElementById("guessesLeft").innerHTML = 10;
      randomIndex = Math.floor(Math.random() * alphabet.length);
      computerChoice = alphabet[randomIndex];
      console.log(computerChoice);
    }

    if (computerChoice === userChoice) {
      alert("You won!");
      document.getElementById("wins").innerHTML = wins++;
      guessedLetters = [];
      document.getElementById("guessedLetters").innerHTML = guessedLetters;
      randomIndex = Math.floor(Math.random() * alphabet.length);
      computerChoice = alphabet[randomIndex];
      console.log(computerChoice);
      guessesLeft = 10;
      document.getElementById("guessesLeft").innerHTML = 10;
      
    } else {
      console.log("Guess again!");
      document.getElementById("guessesLeft").innerHTML = guessesLeft--;
      guessedLetters.push(userChoice);
      document.getElementById("guessedLetters").innerHTML = guessedLetters;
    }
} 