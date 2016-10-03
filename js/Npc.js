function Npc(Character) {
    this.character = Character;
    this.arrowKeys = [38, 39, 40, 37];
    this.speed = 75; // == in milliseconds
    this.score = document.getElementById("npc-score");
    this.playing = null;
}

Npc.prototype.play = function() {
    var npc = this;
    npc.playing = setInterval(function() {
        var randomDirection = Util.randomElement(npc.arrowKeys);
        npc.character.move.direction(randomDirection);
        npc.character.painter.npcPaint();
        npc.updateScore();
    }, npc.speed);
};

Npc.prototype.currentScore = function() {
    return document.getElementsByClassName("npc-painted").length;
}

Npc.prototype.updateScore = function() {
    this.score.innerHTML = this.currentScore();
}

Npc.prototype.stop = function() {
    clearInterval(this.playing);
}