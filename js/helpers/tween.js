(function (window) {
    /**
     * Easing library
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
        },

        cubeIn: function (t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        },

        cubeOut: function (t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        },

        cubeInOut: function (t, b, c, d) {
            t /= d/2;

            if (t < 1) {
                return c / 2 * t * t * t + b;
            }

            t -= 2;
            return c/2*(t*t*t + 2) + b;
        },

        quartIn: function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t + b;
        },

        quartOut: function (t, b, c, d) {
            t /= d;
            t--;
            return -c * (t * t * t * t - 1) + b;
        },

        quartInOut: function (t, b, c, d) {
            t /= d/2;
            if (t < 1) {
                return c / 2 * t * t * t * t + b;
            }

            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        },

        quintIn: function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t * t + b;
        },

        quintOut: function (t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        },

        quintInOut: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t * t * t * t + b;
            }

            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        },

        sineIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },

        sineOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },

        sineInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },

        expoIn: function (t, b, c, d) {
            return c * Math.pow(2, 10 * (t / d - 1)) + b;
        },

        expoOut: function (t, b, c, d) {
            return c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        expoInOut: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }

            t--;
            return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        },

        circIn: function (t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        },

        circOut: function (t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t * t) + b;
        },

        circInOut: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            }

            t -= 2;
            return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        }
    };

    var _private = {

    };

    /**
     * Constructor for the tween
     * @todo Ability to reset the tween to make it run the from the current time
     * @todo Ability to change all 4 properties on the fly
     * @param {function|string} loop Allows you to declare a callback, 'loop',
     * or 'repeat' the tween
     */
    window.Tween = function (startValue, distance, duration, animationType, loop) {
        this.startTime = Date.now();
        this.startValue = startValue;
        this.distance = distance;
        this.duration = duration;
        this.animationType = animationType;
        this.loop = loop;
    };

    /**
     * Get the current value of the tween
     * @todo Round the final result to four decimal places
     * @todo Turn repeated statements into a private method
     * @returns {number} Current value of the tween
     */
    window.Tween.prototype.getValue = function () {
        // Run normally
        if (!this.expired()) {
            return _easingLibrary[this.animationType](game.time - this.startTime, this.startValue, this.distance, this.duration);

        // Ended and no repeat is present
        } else if (!this.loop) {
            return this.startValue + this.distance;

        // Calculate time passed and restart repeat
        } else if (this.loop === 'repeat') {
            this.startTime = Date.now() + (this.startTime + this.duration - Date.now());
            return _easingLibrary[this.animationType](game.time - this.startTime, this.startValue, this.distance, this.duration);

        // Run a reverse repeat
        } else {
            this.startValue = this.startValue + this.distance;
            this.distance = -this.distance;
            this.startTime = Date.now() + (this.startTime + this.duration - Date.now());
            return _easingLibrary[this.animationType](game.time - this.startTime, this.startValue, this.distance, this.duration);
        }
    };

    /**
     * Has the tween expired yet?
     * @returns {boolean} True if the tween has expired
     */
    window.Tween.prototype.expired = function () {
        return this.startTime + this.duration < game.time;
    };

    /**
     * Set the tween's properties
     */
    window.Tween.prototype.set = function () {

    };

    /**
     * Resets the tween and runs it relative to the current time
     */
    window.Tween.prototype.reset = function () {

    };
}(window));