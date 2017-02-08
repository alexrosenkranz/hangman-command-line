var figlet = require('figlet');

function Word(pickedWord) {
    this.pickedWord = pickedWord;
    this.guessesCount = 10;
    this.correctCount = 0;
    this.workingPlaceHolder;
}

Word.prototype.checkLetter = function(guessedLetter, place, guessPrompt, letterArray, newGame) {
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
        };
        letterArray.push(guessedLetter);
        console.log('Correct: ' + this.correctCount + ' || Guesses Left: ' + this.guessesCount);
        console.log('===================');
        console.log(this.workingPlaceHolder);
        if (this.correctCount === (this.pickedWord.length - spaces)) {
            figlet('You win!! \n', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data)
            });
            newGame();
        } else if (this.guessesCount <= 0) {
            figlet('You lose!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data)
            });
            newGame();
        } else {
            guessPrompt();
        }
    } else {
        console.log("you already picked this letter, go again!");
        console.log('===================');
        guessPrompt();
    }
}

module.exports = Word;