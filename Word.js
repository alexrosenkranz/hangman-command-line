function Word(pickedWord) {
    this.pickedWord = pickedWord;
    this.guessesCount = 10;
    this.correctCount = 0;
    this.workingPlaceHolder;
}

Word.prototype.checkLetter = function(l, place, guessPrompt, letterArray) {
    if (!letterArray.includes(l)) {
        for (var i = 0; i < this.pickedWord.length; i++) {
            if ((l == this.pickedWord.substring(i, i + 1)) && (this.correctCount === 0)) {
                this.correctCount++;
                place = place.substring(0, i) + l + place.substring(i + 1, place.length + 1);
                this.workingPlaceHolder = place;
            } else if ((l == this.pickedWord.substring(i, i + 1)) && (this.correctCount > 0)) {
                this.correctCount++;
                this.workingPlaceHolder = this.workingPlaceHolder.substring(0, i) + l + this.workingPlaceHolder.substring(i + 1, this.workingPlaceHolder.length + 1);
            } else {
                this.guessesCount--;
            }
        }
        letterArray.push(l);

        console.log('Correc: ' + this.correctCount);
        console.log(this.workingPlaceHolder);
        guessPrompt();
    } else {
        console.log("you already picked this letter, go again!");
        guessPrompt();
    }
}

module.exports = Word;