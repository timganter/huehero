function Game(player, npc, timeLimit) {
    this.player = new Player(new Character(player));
    this.npc = new Npc(new Character(npc));
    this.space = new Space();

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
        keys: [32, 13],
        handlers: []
    };

    this.winner = document.getElementById("winner");

    this.init();
}

Game.prototype.init = function() {
    this.space.make();
    this.enableStartButton();
}

Game.prototype.start = function() {
    this.reset();
    this.disableButton(this.startButton);
    this.startClock();

    this.player.play();
    this.npc.play();
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
    var npc = this.npc;

    player.stop();
    npc.stop();
    
    player.updateScore();
    npc.updateScore();

    var playerScore = player.currentScore();
    var npcScore = npc.currentScore();

    if (playerScore > npcScore) {
        this.winner.innerHTML = "You win!";
        this.winningCharacter(this.player.character);
        this.mouth("player-mouth", "smile");
        this.mouth("npc-mouth", "frown");
    }

    if (playerScore < npcScore) {
        this.winner.innerHTML = "You lose!";
        this.mouth("player-mouth", "frown");
        this.winningCharacter(this.npc.character);
        this.mouth("npc-mouth", "smile");
    }

    if (playerScore === npcScore) {
        this.winner.innerHTML = "It's a tie!";
    }

    this.enableStartButton();
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
    this.mouth("npc-mouth", false);
    this.cells[0].appendChild(this.player.character.element);
    this.cells[99].appendChild(this.npc.character.element);
};

Game.prototype.resetBoard = function() {
    var numOfCells = this.cells.length;
    for (var i=0; i < numOfCells; i++) {
        this.cells[i].className = "cell";
    }
};

Game.prototype.resetScore = function() {
    this.player.updateScore();
    this.npc.updateScore();
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

Game.prototype.enableStartButton = function(button) {
    game = this;
    startButton = this.startButton;
    Util.removeClass(startButton.element, "disabled");

    // == Add click event listener.
    startButton.handlers.push(
        EventHandler.addListener( "click", function() {
            game.start();
        }, startButton.element)
    );

    // Add keydown event listener.
    startButton.handlers.push(
        EventHandler.addListener("keydown", function(e) {
            if (startButton.keys.indexOf(e.keyCode) > -1) {
                e.preventDefault();
                game.start();                    
            }
        }, window)
    );

};

Game.prototype.disableButton = function(button) {
    var startButton = this.startButton;
    var numOfStartButtonHandlers = startButton.handlers.length;
    
    startButton.element.className += " disabled";
    
    // == Remove all startButton event listeners.
    for(i=0; i < numOfStartButtonHandlers; i++) {
        EventHandler.removeListener(startButton.handlers[i]);
    }
};