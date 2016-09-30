var Util = function() {
    return {
        // == Get the child index from an array of children elements.
        childIndex: function(child, children) {
            var numberOfChildren = children.length;
            for (var i = 0; i < numberOfChildren; ++i) {
                if (child === children[i]) {
                    return i;
                }
            }
        },

        // == Check if an element has a given class name.
        hasClass: function(element, className) {
            return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
        },

        // == Check if an element doesn't have a given class.
        doesntHaveClass: function(element, className) {
            return ! this.hasClass(element, className);
        },

        // == Get a random element from an array.
        randomElement: function(array) {
            return array[Math.floor(Math.random() * array.length)];
        },

        // == Remove a class from an element.
        removeClass: function(element, className) {
            if (this.hasClass(element, className)) {
                element.classList.remove(className);
            }
        }
    }
}();