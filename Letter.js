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
    console.log(this.placeHolder);
};

module.exports = Letter;