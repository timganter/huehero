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
    
    this.countdown = {
        length: 3000,
        timeLeft: 3000,
        running: null
    }

    this.announcer = document.getElementById("announcer");

    this.init();
}

Game.prototype.init = function() {
    var Game = this;

    Game.space.make();
    Game.enableStartButton();
}

Game.prototype.start = function() {    
    var Game = this;

    Game.startClock();
    Game.player.play();
    Game.npc.play();
};

Game.prototype.startCountdown = function() {
    var Game = this;
    var announcer = Game.announcer;
    var countdown = Game.countdown;

    Game.reset();
    Game.disableButton(Game.startButton);
    announcer.className += ' ' + "show";
    
    announcer.innerHTML = '<span class="center countdown">' + (countdown.timeLeft / 1000)  + '</span>';

    countdown.running = setInterval(function() {
        Game.runCountdown();
    }, 1000);
};

Game.prototype.runCountdown = function() {   
    var timeLeft = this.countdown.timeLeft -= 1000;
    var Game = this;
    var announcer = Game.announcer;

    if (timeLeft === 0) {
        announcer.innerHTML = '<span class="center countdown">Go!</span>';
        Game.start();
    } else {
        announcer.innerHTML = '<span class="center countdown">' + (timeLeft / 1000)  + '</span>';
    }

    if (timeLeft === -1000) { 
        Game.stopCountdown();
    }
};

Game.prototype.stopCountdown = function() {
    var Game = this;

    clearInterval(Game.countdown.running);
    Util.removeClass(Game.announcer, "show");
    Game.announcer.innerHTML = "";
    Game.countdown.timeLeft = Game.countdown.length;
}

Game.prototype.startClock = function() {
    var Game = this;
    var infoPanel = Game.clock.element.parentElement;

    Util.removeClass(Game.clock.timeElement, "clock-stop");
    Game.clock.timeElement.innerHTML = (Game.clock.timeLimit / 1000) + "s";

    if ( Util.doesntHaveClass(infoPanel, "show") ) {
        infoPanel.className += ' ' + "show";
    }

    Game.clock.running = setInterval(function() {
        Game.runClock();
    }, 1000);
};

Game.prototype.runClock = function() {
    var Game = this;
    var clock = Game.clock;

    clock.timeLeft -= 1000;
    clock.timeElement.innerHTML = "<span>" + (clock.timeLeft / 1000)  + "s</span>";
    
    if (clock.timeLeft === 10000) {
        clock.timeElement.className += " clock-warning";
    }

    if (clock.timeLeft === 0) {
        Game.stopClock();
        Game.gameOver();
    }
};

Game.prototype.stopClock = function() {
    var clock = this.clock;

    clearInterval(clock.running);
    Util.removeClass(clock.timeElement, "clock-warning");
    clock.timeElement.className += " clock-stop";
}

Game.prototype.gameOver = function() {
    var Game = this;
    var Player = Game.player;
    var Npc = Game.npc;

    Player.stop();
    Npc.stop();
    
    Player.updateScore();
    Npc.updateScore();

    var playerScore = Player.currentScore();
    var npcScore = Npc.currentScore();

    if (playerScore > npcScore) {
        Game.announcer.innerHTML = "You win!";
        Game.winner(Game.player.character);
        Game.mouth("player-mouth", "smile");
        Game.mouth("npc-mouth", "frown");
    }

    if (playerScore < npcScore) {
        Game.announcer.innerHTML = "You lose!";
        Game.mouth("player-mouth", "frown");
        Game.winner(Game.npc.character);
        Game.mouth("npc-mouth", "smile");
    }

    if (playerScore === npcScore) {
        Game.announcer.innerHTML = "It's a tie!";
    }

    Game.enableStartButton();
};

Game.prototype.reset = function() {
    var Game = this;

    Game.resetCharacters();
    Game.resetBoard();
    Game.resetScore();
    Game.clock.timeLeft = Game.clock.timeLimit;
    Game.clock.timeElement.innerHTML = (Game.clock.timeLimit / 1000) + "s";
};

Game.prototype.resetCharacters = function() {
    var Game = this;

    Game.winner(false);
    Game.mouth("player-mouth", false);
    Game.mouth("npc-mouth", false);
    Game.cells[0].appendChild(Game.player.character.element);
    Game.cells[99].appendChild(Game.npc.character.element);
};

Game.prototype.resetBoard = function() {
    var Game = this; 

    var numOfCells = Game.cells.length;
    for (var i=0; i < numOfCells; i++) {
        Game.cells[i].className = "cell";
    }

    Game.announcer.innerHTML = "";
};

Game.prototype.resetScore = function() {
    var Game = this;

    Game.player.updateScore();
    Game.npc.updateScore();
};

Game.prototype.winner = function(character) {
    if (character === false) {
        var characters = document.getElementsByClassName("character");
        var numOfCharacters = characters.length;
        for (var i=0; i < numOfCharacters; i++) {
            Util.removeClass(characters[i], "winner");
        }
    } 

    else {
        character.element.className += " winner";
    }
}

Game.prototype.mouth = function(mouth, emotion) {
    var mouths = document.getElementsByClassName(mouth);
    var numberOfMouths = mouths.length;

    if (emotion === false) {
        for (var i=0; i < numberOfMouths; i++) {
            Util.removeClass(mouths[i], "smile");
            Util.removeClass(mouths[i], "frown");
        }
    } 

    else {
        for (var i=0; i < numberOfMouths; i++) {
            mouths[i].className += " " + emotion;
        }
    }
};

Game.prototype.enableStartButton = function(button) {
    Game = this;
    startButton = Game.startButton;
    Util.removeClass(startButton.element, "disabled");

    // == Add click event listener.
    startButton.handlers.push(
        EventHandler.addListener( "click", function() {
            Game.startCountdown();
        }, startButton.element)
    );

    // Add keydown event listener.
    startButton.handlers.push(
        EventHandler.addListener("keydown", function(e) {
            if (startButton.keys.indexOf(e.keyCode) > -1) {
                e.preventDefault();
                Game.startCountdown();                    
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