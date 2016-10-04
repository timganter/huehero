function Move(element) {
    this.element = element;
}

Move.prototype.direction = function(keyCode) {
    var Move = this;

    switch(keyCode) {
        case 38: 
            Move.north(new Vector(Move.element));
            break;
        case 39:
            Move.east(new Vector(Move.element));
            break;
        case 40:
            Move.south(new Vector(Move.element));
            break;
        case 37:
            Move.west(new Vector(Move.element));
            break;
    }
}

Move.prototype.north = function(vector) {
    if (vector.north()) {
        vector.north().appendChild(vector.element);
    }
};

Move.prototype.east = function(vector) {
    if (vector.east()) {
        vector.east().appendChild(vector.element);
    }
};

Move.prototype.south = function(vector) {
    if (vector.south()) {
        vector.south().appendChild(vector.element);
    }
};

Move.prototype.west = function(vector) {
    if(vector.west()) {
        vector.west().appendChild(vector.element);    
    }
};