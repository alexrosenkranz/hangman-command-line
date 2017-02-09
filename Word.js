var figlet = require('figlet');
var colors = require('colors');

function Word(pickedWord) {
    this.pickedWord = pickedWord;
    this.guessesCount = 10;
    this.correctCount = 0;
    this.workingPlaceHolder;
}

// set theme 
colors.setTheme({
    verbose: 'cyan',
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

Word.prototype.checkLetter = function(guessedLetter, place, guessPrompt, letterArray, newGame) {
    guessedLetter = guessedLetter.toUpperCase();
    var spaces = this.pickedWord.split(" ").length - 1;
    if (!letterArray.includes(guessedLetter)) {
        for (var i = 0; i < this.pickedWord.length; i++) {
            if ((guessedLetter == this.pickedWord.substring(i, i + 1)) && (this.correctCount === 0)) {
                this.correctCount++;
                place = place.substring(0, i) + guessedLetter + place.substring(i + 1, place.length + 1);
                this.workingPlaceHolder = place;
            } else if ((guessedLetter == this.pickedWord.substring(i, i + 1)) && (this.correctCount > 0)) {
                this.workingPlaceHolder = this.workingPlaceHolder.substring(0, i) + guessedLetter + this.workingPlaceHolder.substring(i + 1, this.workingPlaceHolder.length + 1);
                this.correctCount++;
            }
        }
        if (!this.pickedWord.includes(guessedLetter)) {
            this.guessesCount--;
        }
        letterArray.push(guessedLetter);
        console.log(colors.error('Correct: ' + this.correctCount + ' || Guesses Left: ' + this.guessesCount));
        console.log('===================');
        console.log(colors.debug("Guess the word/phrase: " + this.workingPlaceHolder));
        console.log('===================');
        if (this.correctCount === (this.pickedWord.length - spaces)) {
            figlet('You win!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log('===================');
                console.log(data);
                console.log('===================');
                newGame();
            });

        } else if (this.guessesCount <= 0) {
            figlet('You lose!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log('===================');
                console.log(data);
                console.log('===================');
                newGame();
            });

        } else {

            guessPrompt();
        }
    } else {

        console.log(colors.verbose("You already picked this letter, go again!"));
        console.log('===================');
        guessPrompt();
    }
};

module.exports = Word;