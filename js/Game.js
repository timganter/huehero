function Game(player, villan, timeLimit) {
    this.player = new Player(new Character(player));
    this.villan = new Villan(new Character(villan));

    this.cells = document.getElementsByClassName("cell");
    
    this.clock = {
        element: document.getElementById("clock"),
        timeElement: document.getElementById("clockTime"),
        timeLimit: timeLimit,
        timeLeft: timeLimit,
        running: null
    }

    this.startButton = {
        element: document.getElementById("start-button"),
        handler: this.enableButton(document.getElementById("start-button"))
    };

    this.winner = document.getElementById("winner");
}

Game.prototype.enableButton = function(button) {
    game = this;
    Util.removeClass(button, "disabled");

    return EventHandler.addListener("click", function() { 
        game.start();
    }, button);
};

Game.prototype.disableButton = function(button) {
    button.element.className += " disabled";
    return EventHandler.removeListener(button.handler);
};

Game.prototype.start = function() {
    this.reset();
    this.disableButton(this.startButton);
    this.startClock();

    this.player.play();
    this.villan.play();
};

Game.prototype.startClock = function() {
    var game = this;
    var infoPanel = game.clock.element.parentElement;

    Util.removeClass(game.clock.timeElement, "clock-stop");
    game.clock.timeElement.innerHTML = (game.clock.timeLimit / 1000) + "s";

    if ( Util.doesntHaveClass(infoPanel, "show") ) {
        infoPanel.className += ' ' + "show";
    }

    this.clock.running = setInterval(function() {
        game.runClock();
    }, 1000);
};

Game.prototype.runClock = function() {
    this.clock.timeLeft -= 1000;
    this.clock.timeElement.innerHTML = "<span>" + (this.clock.timeLeft / 1000)  + "s</span>";
    

    if (this.clock.timeLeft === 10000) {
        this.clock.timeElement.className += " clock-warning";
    }

    if (this.clock.timeLeft === 0) {
        this.stopClock();
        this.gameOver();
    }

    return false;
};

Game.prototype.stopClock = function() {
    clearInterval(this.clock.running);
    Util.removeClass(this.clock.timeElement, "clock-warning");
    this.clock.timeElement.className += " clock-stop";
}

Game.prototype.gameOver = function() {
    var player = this.player;
    var villan = this.villan;

    player.stop();
    villan.stop();
    
    player.updateScore();
    villan.updateScore();

    var playerScore = player.currentScore();
    var villanScore = villan.currentScore();

    if (playerScore > villanScore) {
        this.winner.innerHTML = "You win!";
        this.winningCharacter(this.player.character);
        this.mouth("player-mouth", "smile");
        this.mouth("villan-mouth", "frown");
    }

    if (playerScore < villanScore) {
        this.winner.innerHTML = "You lose!";
        this.mouth("player-mouth", "frown");
        this.winningCharacter(this.villan.character);
        this.mouth("villan-mouth", "smile");
    }

    if (playerScore === villanScore) {
        this.winner.innerHTML = "It's a tie!";
    }

    this.startButton.handler = this.enableButton(this.startButton.element);
};

Game.prototype.reset = function() {
    this.resetCharacters();
    this.resetBoard();
    this.resetScore();
    this.clock.timeLeft = this.clock.timeLimit;
    this.clock.timeElement.innerHTML = (this.clock.timeLimit / 1000) + "s";
};

Game.prototype.resetCharacters = function() {
    this.winningCharacter(false);
    this.mouth("player-mouth", false);
    this.mouth("villan-mouth", false);
    this.cells[0].appendChild(this.player.character.element);
    this.cells[99].appendChild(this.villan.character.element);
};

Game.prototype.resetBoard = function() {
    var numOfCells = this.cells.length;
    for (var i=0; i < numOfCells; i++) {
        this.cells[i].className = "cell";
    }
};

Game.prototype.resetScore = function() {
    this.player.updateScore();
    this.villan.updateScore();
    this.winner.innerHTML = "";
};

Game.prototype.winningCharacter = function(character) {
    if (character === false) {
        var characters = document.getElementsByClassName("character");
        var numOfCharacters = characters.length;
        for (var i=0; i < numOfCharacters; i++) {
            Util.removeClass(characters[i], "winner");
        }

        return true;
    }

    character.element.className += " winner";
}

Game.prototype.mouth = function(mouth, emotion) {
    var mouths = document.getElementsByClassName(mouth);
    var numberOfMouths = mouths.length;

    if (emotion === false) {
        for (var i=0; i < numberOfMouths; i++) {
            Util.removeClass(mouths[i], "smile");
            Util.removeClass(mouths[i], "frown");
        }

        return true;
    }

    for (var i=0; i < numberOfMouths; i++) {
        mouths[i].className += " " + emotion;
    }
};