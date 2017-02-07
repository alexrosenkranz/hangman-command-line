function Word(pickedWord) {
    this.pickedWord = pickedWord;
}

Word.prototype.checkLetter = function(l, place, guessPrompt) {
    if (!place.includes(l)) {
        for (var i = 0; i < this.pickedWord.length; i++) {
            if (l == this.pickedWord.substring(i, i + 1)) {
                // correct++;
                place = place.substring(0, i) + l + place.substring(i + 1, place.length + 1);
            }
        }
        letterObj.placeHolder = place;
        console.log(place);
        guessPrompt();
    } else {
        console.log("you already picked this letter, go again!");
        guessPrompt();
    }
}

module.exports = Word;