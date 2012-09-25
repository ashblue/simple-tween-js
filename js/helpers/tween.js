(function (window) {
    /**
     * Easing library
     * @todo Not complete, see link reference for a simple library of methods that can be used
     * to complete it
     * @link http://gizma.com/easing/
     */
    var _easingLibrary = {
        /**
         * @param {number} t Current time
         * @param {number} b Start value
         * @param {number} c End value
         * @param {number} d Duration
         */
        linear: function (t, b, c, d) {
            return c * t / d + b;
        },

        quadIn: function (t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },

        quadOut: function (t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        },

        quadInOut: function (t, b, c, d) {
            t /= d / 2;

            if (t < 1) {
                return c / 2 * t * t + b;
            }

            t--;

            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    };

    var _private = {

    };

    /**
     * Constructor for the tween
     * @todo Take a repeat property
     * @todo Ability to reset the tween to make it run the from the current time
     * @todo Ability to attach a callback at the end
     * @todo Ability to change all 4 of the tweens properties on the fly
     */
    window.Tween = function (startValue, endValue, duration, animationType) {
        this.startTime = Date.now();
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.animationType = animationType;
    };

    /**
     * Get the current value
     * @todo Round the final result to four decimal places
     */
    window.Tween.prototype.getValue = function () {
        return this.startTime + this.duration > game.time ?
            _easingLibrary[this.animationType](game.time - this.startTime, this.startValue, this.endValue, this.duration) :
            this.endValue;
    };
}(window));