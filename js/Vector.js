function Vector(element) {
    this.element = element;
}

Vector.prototype.north = function() {
    var vectorCell = this.element.parentElement;
    var vectorRow = vectorCell.parentElement;
    var vectorRowChildren = vectorRow.children;
    var vectorIndex = Util.childIndex(vectorCell, vectorRowChildren);
    var previousRow = vectorRow.previousElementSibling;

    if (previousRow) {
        return previousRow.children[vectorIndex];    
    }

    // == First row.
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

    if (nextRow) {
        return nextRow.children[vectorIndex];    
    }

    // == Last row.
    return null;
}

Vector.prototype.west = function() {
    return this.element.parentElement.previousElementSibling;
}