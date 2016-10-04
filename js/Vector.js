function Vector(element) {
    this.element = element;
}

Vector.prototype.north = function() {
    var Vector = this;
    var vectorCell = Vector.element.parentElement;
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
    var Vector = this;
    return Vector.element.parentElement.nextElementSibling;
}

Vector.prototype.south = function() {
    var Vector = this;
    var vectorCell = Vector.element.parentElement;
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
    var Vector = this;
    return Vector.element.parentElement.previousElementSibling;
}