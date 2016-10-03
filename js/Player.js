function Player(Character) {
    this.character = Character;
    this.score = document.getElementById("player-score");
    this.movement = {
            keys: [38, 39, 40, 37], // == Arrow keys
            handlers: []
        };
}

Player.prototype.play = function() {
    this.enableMovement();
};

Player.prototype.enableMovement = function() {
    var player = this;
    var longPress = true;
    var movement = this.movement;

    movement.handlers.push(
        EventHandler.addListener("keydown", function(e) {
            // == If an arrowkey was pressed.
            if (movement.keys.indexOf(e.keyCode) > -1) { 
                // == Prevent default behavior.
                e.preventDefault();

                if (! longPress) {
                    return e.keyCode;
                }

                // == Disable long press.
                longPress = false;

                player.character.move.direction(e.keyCode);
                player.character.painter.paint();
                player.updateScore();
            }
        }, window)
    );

    movement.handlers.push(
        EventHandler.addListener("keyup", function(e) {
            // == If an arrowkey was released.
            if (movement.keys.indexOf(e.keyCode) > -1) { 
                // == Turn long press back on.
                longPress = true;
            }
        }, window)
    );
}

Player.prototype.disableMovement = function () {
    var numOfMovementHandlers = this.movement.handlers.length;

    for(i=0; i < numOfMovementHandlers; i++) {
        EventHandler.removeListener(this.movement.handlers[i]);
    }
}

Player.prototype.currentScore = function() {
    return document.getElementsByClassName("painted").length;
}

Player.prototype.updateScore = function() {
    this.score.innerHTML = this.currentScore();
}

Player.prototype.stop = function() {
    this.disableMovement();
}