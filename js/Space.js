function Space() {
    this.canvas = document.getElementById("space");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    
    this.starsPerGalaxy = 250;
    this.numberOfGalaxies = 15;
    this.maxGalaxySize = { xRad: 150, yRad: 100 };
    this.maxStarSize = 2;
    this.numberOfStars = 4000;
}

Space.prototype.make = function() {
    var numberOfStars = this.numberOfStars;
    var numberOfGalaxies = this.numberOfGalaxies;
    
    for(var i=0; i < numberOfStars; i++) {
        this.star();
    }    

    for(var i=0; i < numberOfGalaxies; i++) {
        this.galaxy();
    }
};

Space.prototype.star = function(x=null, y=null) {
    var ctx = this.ctx;
    var canvas = this.canvas;

    var r = Util.randomNumber(this.maxStarSize);

    if (x === null) {
        var x = Util.randomNumber(canvas.width);    
    }

    if (y === null) {
        var y = Util.randomNumber(canvas.height);
        ctx.beginPath();
    }

    ctx.fillStyle = "rgba(255, 255, 255," + 1 / Util.randomNumber(10) + ")";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
};

Space.prototype.galaxy = function() {
    var x = Util.randomNumber(this.canvas.width);
    var y = Util.randomNumber(this.canvas.height);
    var xRad = Util.randomNumber(this.maxGalaxySize.xRad);
    var yRad = Util.randomNumber(this.maxGalaxySize.yRad);

    this.galaxyStars(x, y, xRad, yRad);
};

Space.prototype.galaxyStars = function(x, y, xRad, yRad) {
    var ctx = this.ctx;
    var xGalaxyCenter = x;
    var yGalaxyCenter = y;
    var xAmount, yAmount;
    
    for(var i=0; i < this.starsPerGalaxy; i++) {
        xAmount = Util.randomNumber(xRad);
        if (Util.randomNumber(2) === 0) { xAmount = -Math.abs(xAmount); }
        x = (xGalaxyCenter + xAmount * yRad / yAmount) / Math.tan(xRad);
        
        yAmount = Util.randomNumber(yRad);
        if (Util.randomNumber(2) === 0) { yAmount = -Math.abs(yAmount); }
        y = (yGalaxyCenter + yAmount * xRad / xAmount) / Math.tan(yRad);
        
        ctx.moveTo(x, y);
        this.star(x, y);
    }
};