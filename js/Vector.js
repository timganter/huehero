function Vector(element) {
    this.element = element;
}

Vector.prototype.north = function() {
    var vectorCell = this.element.parentElement;
    var vectorRow = vectorCell.parentElement;
    var vectorRowChildren = vectorRow.children;
    var vectorIndex = Util.childIndex(vectorCell, vectorRowChildren);
    var previousRow = vectorRow.previousElementSibling;

    // == First row.
    if (previousRow) {
        return previousRow.children[vectorIndex];    
    }

    return null;
}

Vector.prototype.east = function() {
    return this.element.parentElement.nextElementSibling;
}

Vector.prototype.south = function() {
    var vectorCell = this.element.parentElement;
    var vectorRow = vectorCell.parentElement;
    var vectorRowChildren = vectorRow.children;
    var vectorIndex = Util.childIndex(vectorCell, vectorRowChildren);
    var nextRow = vectorRow.nextElementSibling;

    // == Last row.
    if (nextRow) {
        return nextRow.children[vectorIndex];    
    }

    return null;
}

Vector.prototype.west = function() {
    return this.element.parentElement.previousElementSibling;
}