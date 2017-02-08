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

function Letter(pickedLetter) {
    this.pickedLetter = pickedLetter;
    this.placeHolder = "";
    this.lettersGuessed = [];
}

Letter.prototype.holdPlaces = function(w) {
    for (var i = 0; i < w.pickedWord.length; i++) {
        if (w.pickedWord.substring(i, i + 1) === " ") {
            this.placeHolder = this.placeHolder + " ";
        } else {
            this.placeHolder = this.placeHolder + "_";
        }
    }
    this.placeHolder = this.placeHolder.slice(0);
    console.log(colors.debug("Guess the word/phrase: " + this.placeHolder));
};

module.exports = Letter;