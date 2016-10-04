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
    var Space = this;
    var numberOfStars = Space.numberOfStars;
    var numberOfGalaxies = Space.numberOfGalaxies;

    for(var i=0; i < numberOfStars; i++) {
        Space.star();
    }    

    for(var i=0; i < numberOfGalaxies; i++) {
        Space.galaxy();
    }
};

Space.prototype.star = function(x=null, y=null) {
    var Space = this;
    var ctx = Space.ctx;
    var canvas = Space.canvas;

    var r = Util.randomNumber(Space.maxStarSize);

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
    var Space = this;
    var x = Util.randomNumber(Space.canvas.width);
    var y = Util.randomNumber(Space.canvas.height);
    var xRad = Util.randomNumber(Space.maxGalaxySize.xRad);
    var yRad = Util.randomNumber(Space.maxGalaxySize.yRad);

    Space.galaxyStars(x, y, xRad, yRad);
};

Space.prototype.galaxyStars = function(x, y, xRad, yRad) {
    var Space = this;
    var ctx = Space.ctx;
    var xGalaxyCenter = x;
    var yGalaxyCenter = y;
    var xAmount, yAmount;
    
    for(var i=0; i < Space.starsPerGalaxy; i++) {
        xAmount = Util.randomNumber(xRad);
        if (Util.randomNumber(2) === 0) { xAmount = -Math.abs(xAmount); }
        x = (xGalaxyCenter + xAmount * yRad / yAmount) / Math.tan(xRad);
        
        yAmount = Util.randomNumber(yRad);
        if (Util.randomNumber(2) === 0) { yAmount = -Math.abs(yAmount); }
        y = (yGalaxyCenter + yAmount * xRad / xAmount) / Math.tan(yRad);
        
        ctx.moveTo(x, y);
        Space.star(x, y);
    }
};