var inquirer = require('inquirer');
var Word = require('./Word.js');
var Letter = require('./Letter.js');
var figlet = require('figlet');
var colors = require('colors');

// set theme 
colors.setTheme({
    verbose: 'cyan',
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

var wordArr = ['THE JUAN MACLEAN', 'LCD SOUNDSYSTEM', 'HOLY GHOST', 'FLOATING POINTS', 'TENSNAKE'];
var newWord;
var letterObj;

function chooseWord() {
    var pickedIndex = wordArr[Math.floor(Math.random() * wordArr.length)];
    newWord = new Word(pickedIndex);
}

// Create function that holds inquirer prompt to start new game
function newGamePrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "game",
        message: "Do you want to start a new game of hangman?",
    }]).then(function(answer) {
        if (answer.game) {
            figlet('Good Luck!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log('===================');
                console.log(data);
                console.log('===================');
                chooseWord();
                letterObj = new Letter();
                letterObj.holdPlaces(newWord);
                letterGuess();
            });

        } else {
            console.log(colors.error('Restart by typing "node game.js" into your command line. If you are done, enjoy the rest of your day!'));
        }
    });
}
newGamePrompt();

// Create function that holds inquirer prompt for a letter to guess
function letterGuess() {
    inquirer.prompt([{
        type: "input",
        name: "letter",
        message: "Pick a letter and hit enter/return.",
    }]).then(function(data) {
        newWord.checkLetter(data.letter, letterObj.placeHolder, letterGuess, letterObj.lettersGuessed, newGamePrompt);
    });
}