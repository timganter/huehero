function Painter(element) {
    this.element = element;
    this.paintClass = 'painted';
    this.villanPaintClass = 'villan-painted';
}

Painter.prototype.paint = function() {
    this.removePaint(this.villanPaintClass);

    if (Util.doesntHaveClass(this.element.parentElement, this.paintClass)) {
        this.element.parentElement.className += ' ' + this.paintClass;
    }
};

Painter.prototype.removePaint = function(paintClass) {
    Util.removeClass(this.element.parentElement, paintClass);
}

Painter.prototype.villanPaint = function() {
    this.removePaint(this.paintClass);

    if (Util.doesntHaveClass(this.element.parentElement, this.villanPaintClass)) {
        this.element.parentElement.className += ' ' + this.villanPaintClass;
    }
}
