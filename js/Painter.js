function Painter(element) {
    this.element = element;
    this.paintClass = 'painted';
    this.npcPaintClass = 'npc-painted';
}

Painter.prototype.paint = function() {
    this.removePaint(this.npcPaintClass);

    if (Util.doesntHaveClass(this.element.parentElement, this.paintClass)) {
        this.element.parentElement.className += ' ' + this.paintClass;
    }
};

Painter.prototype.removePaint = function(paintClass) {
    Util.removeClass(this.element.parentElement, paintClass);
};

Painter.prototype.npcPaint = function() {
    this.removePaint(this.paintClass);

    if (Util.doesntHaveClass(this.element.parentElement, this.npcPaintClass)) {
        this.element.parentElement.className += ' ' + this.npcPaintClass;
    }
};

Painter.prototype.isPaintable = function (element, character) {
    if (character instanceof Npc) {
        var paint = this.npcPaintClass;
    }

    if (character instanceof Player) {
        var paint = this.paintClass;
    }

    return Util.doesntHaveClass(element, paint);
};
