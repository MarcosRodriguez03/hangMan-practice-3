//someone thinks of a word and we keep it secret from the player
//we will display a series of underscores depedning on the length
//each turn the player will guess 1 letter from the word
//if guess is correct we will display the letter in the blank word
//if we guess wrong we draw a piece of the hangman or tell the user they have x amount of guess
//we display the incorrect guess in a div
//we need a start and restart button 

//we will be using id for 
//start button 
//restart button 
// secret word
// wrong guess
// hangman 
//user guesses

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

//create variables 
let randomWord = "";
let displayWord = [];
let wrongGuess = "";
let guesses = 0;
let maxGuesses = 5;

startBtn.addEventListener('click', function (e) {
    CallApi();
})
restartBtn.addEventListener('click', function(){
    ResetGame();
})

function CallApi() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data[0]);
            StartGame(data[0]);
        })
}

function StartGame(word) {
    randomWord = word;

    for (let i = 0; i < randomWord.length; i++) {
        displayWord[i] = "_"
    }

    GameUpdate()
}

function ResetGame(){
let randomWord = "";
let displayWord = [];
let wrongGuess = "";
let guesses = 0;
let maxGuesses = 5;


secretWord.innerText = "[Secret Word]";
wrongGuesses.innerText = "letter bank";



}

function GameUpdate() {
    secretWord.innerText = displayWord.join(" ");

    hangMan.innerText = `You have ${guesses}/ ${maxGuesses} left`;
}

userInput.addEventListener('keydown', function (event) {

    if (event.key === "Enter") {
        let guess = userInput.value.toLowerCase();
        userInput.value="";

        if (randomWord.includes(guess)) {
            for (let i = 0; i < randomWord.length; i++) {
                if(randomWord[i] === guess){
                    displayWord[i] = guess;
                }
            }

        }else{
            guesses++;
            wrongGuess += guess;
            wrongGuesses.innerText = wrongGuess;
        }



    }

    GameUpdate();
    GameEnd();
})

function GameEnd(){
    if(guesses === maxGuesses){
        alert('you lost')
        ResetGame();
    }else if(displayWord.join("") === randomWord){
       
        alert('you won')

    }
}