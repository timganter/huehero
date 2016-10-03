function Player(Character) {
    this.character = Character;
    this.score = document.getElementById("player-score");
    this.controls = [38, 39, 40, 37]; // == Arrow keys
}

Player.prototype.play = function() {
    var player = this;
    var controls = player.controls;
    var longPress = true;

    window.onkeydown = function(e) {
        if (controls.indexOf(e.keyCode) > -1) { // == If an arrowkey was pressed.
            e.preventDefault(); // == Prevent default behavior.

            if (! longPress) { // == Disable long press.
                return e.keyCode;
            }

            longPress = false;
            player.character.move.direction(e.keyCode);
            player.character.painter.paint();
            player.updateScore();
        }
    };

    // == Turn long press back on.
    window.onkeyup = function(e) {
        longPress = true;
    }
};

Player.prototype.currentScore = function() {
    return document.getElementsByClassName("painted").length;
}

Player.prototype.updateScore = function() {
    this.score.innerHTML = this.currentScore();
}

Player.prototype.stop = function() {
    controls = this.controls;
    
    window.onkeydown = function(e) {
        if (controls.indexOf(e.keyCode) > -1) {
            return true;
        }
    }
}