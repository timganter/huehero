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
    Audio.handlers = [];

    Audio.setListeners();
}

Audio.prototype.setListeners = function() {
    var audio = this;
    
    // == Start gameOver music after youLose.
    // audio.handlers.push(
        EventHandler.addListener("ended", function(e) {
            audio.gameOver.play();
            audio.reset();
        }, audio.youLose);
    // );

    // == Start gameOver music after youWin.
    // audio.handlers.push(
        EventHandler.addListener("ended", function(e) {
            audio.gameOver.play();
            audio.reset();
            audio.youWin.currentTime = 0;
        }, audio.youWin);
    // );
};

Audio.prototype.playGame = function() {
    var audio = this;

    audio.pauseAll();
    audio.reset();

    audio.gamePlay.play();
};

Audio.prototype.pauseAll = function() {
    var audio = this;

    audio.title.pause();
    audio.gamePlay.pause();
    audio.gamePlayFast.pause();
    audio.gameOver.pause();
    audio.youLose.pause();
    audio.youWin.pause();
};

Audio.prototype.reset = function() {
    var audio = this; 

    audio.title.currentTime = 0;
    audio.gamePlay.currentTime = 0;
    audio.gamePlayFast.currentTime = 0;
    audio.gameOver.currentTime = 0;
    audio.youLose.currentTime = 0;
    audio.youWin.currentTime = 0;
};