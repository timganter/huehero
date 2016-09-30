function Move(element) {
    this.element = element;
}

Move.prototype.direction = function(keyCode) {
    switch(keyCode) {
        case 38: 
            this.north(new Vector(this.element));
            break;
        case 39:
            this.east(new Vector(this.element));
            break;
        case 40:
            this.south(new Vector(this.element));
            break;
        case 37:
            this.west(new Vector(this.element));
            break;
        default:
            return false;
    }
}

Move.prototype.north = function(vector) {
    if (vector.north()) {
        vector.north().appendChild(vector.element);
    }

    return false;
};

Move.prototype.east = function(vector) {
    if (vector.east()) {
        vector.east().appendChild(vector.element);
    }

    return false;
};

Move.prototype.south = function(vector) {
    if (vector.south()) {
        vector.south().appendChild(vector.element);
    }

    return false;
};

Move.prototype.west = function(vector) {
    if(vector.west()) {
        vector.west().appendChild(vector.element);    
    }

    return false;
};