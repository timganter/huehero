function Audio() {
    var Audio = this;

    Audio.title = document.getElementById("audioTitle");
    Audio.title.loop = true;
    Audio.gamePlay = document.getElementById("audioGamePlay");
    Audio.gamePlayFast = document.getElementById("audioGamePlayFast");
    Audio.gameOver = document.getElementById("audioGameOver");
    Audio.gameOver.loop = true;
    Audio.youLose = document.getElementById("audioYouLose");
    Audio.youWin = document.getElementById("audioYouWin");

    Audio.setListeners();
}

Audio.prototype.setListeners = function() {
    var Audio = this;
    
    // == Start gameOver music after youLose.
    EventHandler.addListener("ended", function(e) {
        Audio.gameOver.play();
        Audio.reset();
    }, Audio.youLose);

    // == Start gameOver music after youWin.
    EventHandler.addListener("ended", function(e) {
        Audio.gameOver.play();
        Audio.reset();
        Audio.youWin.currentTime = 0;
    }, Audio.youWin);
};

Audio.prototype.playGame = function() {
    var Audio = this;

    Audio.pauseAll();
    Audio.reset();

    Audio.gamePlay.play();
};

Audio.prototype.pauseAll = function() {
    var Audio = this;

    Audio.title.pause();
    Audio.gamePlay.pause();
    Audio.gamePlayFast.pause();
    Audio.gameOver.pause();
    Audio.youLose.pause();
    Audio.youWin.pause();
};

Audio.prototype.reset = function() {
    var Audio = this; 

    Audio.title.currentTime = 0;
    Audio.gamePlay.currentTime = 0;
    Audio.gamePlayFast.currentTime = 0;
    Audio.gameOver.currentTime = 0;
    Audio.youLose.currentTime = 0;
    Audio.youWin.currentTime = 0;
};