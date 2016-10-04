function Npc(Character) {
    this.character = Character;
    this.vector = new Vector;
    this.arrowKeys = [38, 39, 40, 37];

    this.speed = 150; // == in milliseconds
    this.score = document.getElementById("npc-score");
    this.playing = null;
}

Npc.prototype.play = function() {
    var npc = this;

    npc.playing = setInterval(function() {
        npc.move();
        npc.character.painter.npcPaint();
        npc.updateScore();
    }, npc.speed);
};

Npc.prototype.move = function() {
    var direction = this.look(this.character.element);

    if (direction === false) {
        return this.moveRandom();
    }

    this.character.move.direction(direction);
};

Npc.prototype.look = function(element) {
    var numOfDirections = this.arrowKeys.length;
    var arrowKeys = Util.shuffleArray(this.arrowKeys);

    for(var i=0; i < numOfDirections; i++) {
        if (this.isPaintable(element, arrowKeys[i])) {
            return arrowKeys[i];
        }
    }
    
    return false;
};

Npc.prototype.isPaintable = function(currentLocationElement, direction) {
    var currentVector = new Vector(currentLocationElement);
    var newVector = this.getVector(currentVector, direction);

    if (newVector) {
        return this.character.painter.isPaintable(newVector, this);
    }

    return false;

};

Npc.prototype.getVector = function(currentVector, direction) {
    switch(direction) {
        case 38: 
            return currentVector.north();
        case 39: 
            return currentVector.east();
        case 40: 
            return currentVector.south();
        case 37: 
            return currentVector.west();
        default:
            return false;
    }
};

Npc.prototype.moveRandom = function() {
    var randomDirection = null;
    var npc = this;

    randomDirection = Util.randomItem(npc.arrowKeys);
    npc.character.move.direction(randomDirection);

    return true;
};

Npc.prototype.currentScore = function() {
    return document.getElementsByClassName("npc-painted").length;
};

Npc.prototype.updateScore = function() {
    this.score.innerHTML = this.currentScore();
};

Npc.prototype.stop = function() {
    clearInterval(this.playing);
};