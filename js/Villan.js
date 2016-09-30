function Villan(Character) {
    this.character = Character;
    this.arrowKeys = [38, 39, 40, 37];
    this.speed = 75; // == in milliseconds
    this.score = document.getElementById("villan-score");
    this.playing = null;
}

Villan.prototype.play = function() {
    var villan = this;
    villan.playing = setInterval(function() {
        var randomDirection = Util.randomElement(villan.arrowKeys);
        villan.character.move.direction(randomDirection);
        villan.character.painter.villanPaint();
        villan.updateScore();
    }, villan.speed);
};

Villan.prototype.currentScore = function() {
    return document.getElementsByClassName("villan-painted").length;
}

Villan.prototype.updateScore = function() {
    this.score.innerHTML = this.currentScore();
}

Villan.prototype.stop = function() {
    clearInterval(this.playing);
}