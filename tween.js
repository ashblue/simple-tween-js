/**
 * Desc.
 * @author Ash Blue
 * @link http://blueashes.com
 * @todo Include instructions to replace Date.now() with your game loop's time
 * time to make things more accurate
 * @todo Can the tween methods not be prototypes so they're static?
 */
(function (window) {
    /**
     * Supports easing for the following commands you can demo at
     * http://ashblue.github.com/canvas-tween-demo/ 'linear', 'quadIn', 'quadOut',
     * 'quadInOut', 'cubeIn', 'cubeOut', 'cubeInOut', 'quartIn', 'quartOut', 'quartInOut',
     * 'quintIn', 'quintOut', 'quintInOut', 'sineIn', 'sineOut', 'sineInOut', 'expoIn',
     * 'expoOut', 'expoInOut', 'circIn', 'circOut', 'circInOut'. Adopted from
     * http://gizma.com/easing/
     * @link http://ashblue.github.com/canvas-tween-demo/
     */
    var _easingLibrary = {
        /**
         * @param {number} t Current time in millseconds
         * @param {number} b Start value
         * @param {number} c Distance traveled relative to the start value
         * @param {number} d Duration in milliseconds
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
        /**
         * Rounds the passed number to two decimal places. Prevents large float
         * numbers from being multiplied
         * @param {number} num Number you want to round
         * @returns {number} Rounded number
         */
        round: function (num) {
            return Math.round(num * 100) / 100;
        }
    };

    /**
     * Constructor for the tween
     * @param {number} startValue What value does the tween start at
     * @param {number} distance How far does the tween's value advance from the startValue?
     * @param {number} duration Amount of time in milliseconds the tween runs for
     * @param {string} animationType What easing function should be used from the easing library?
     * See _easingLibrary for a list of potential easing equations.
     * @param {string} loop Can be left blank, set to loop, or repeat. Loop repeats repeats the animation
     * in reverse every time. Repeat will run the original tween from the beginning
     * @returns {self}
     */
    window.Tween = function (startValue, distance, duration, animationType, loop) {
        this.startTime = Date.now();
        this.startValue = startValue;
        this.distance = distance;
        this.duration = duration;
        this.animationType = animationType;
        this.loop = loop;

        return this;
    };

    /**
     * Get the current value of the tween
     * @returns {number} Current value of the tween
     */
    window.Tween.prototype.getValue = function () {
        // Run normally
        if (!this.expired()) {
            var total = _easingLibrary[this.animationType](Date.now() - this.startTime, this.startValue, this.distance, this.duration);

        // Ended and no repeat is present
        } else if (!this.loop) {
            var total = this.startValue + this.distance;

        // Calculate time passed and restart repeat
        } else if (this.loop === 'repeat') {
            this.startTime = Date.now();
            var total = _easingLibrary[this.animationType](Date.now() - this.startTime, this.startValue, this.distance, this.duration);

        // Run a looped repeat in reverse
        } else {
            this.startValue = this.startValue + this.distance;
            this.distance = -this.distance;
            this.startTime = Date.now();
            var total = _easingLibrary[this.animationType](Date.now() - this.startTime, this.startValue, this.distance, this.duration);
        }

        return _private.round(total);
    };

    /**
     * Retrieves the start time relative to the time passed from the previous start time
     * @returns {number} Start time of the tween relative to time passed
     */
    window.Tween.prototype.getStartTime = function () {
        return Date.now() - this.startTime - this.duration + Date.now();
    };

    /**
     * Has the tween expired yet?
     * @returns {boolean} True if the tween has expired
     */
    window.Tween.prototype.expired = function () {
        return this.startTime + this.duration < Date.now();
    };

    /**
     * Set the tween's properties for the beginning value, distance, duration, and animation type
     * @param {number} startValue What value does the tween start at
     * @param {number} distance How far does the tween's value advance from the startValue?
     * @param {number} duration Amount of time in milliseconds the tween runs for
     * @param {string} animationType What easing function should be used from the easing library?
     * @param {string} loop Can be left blank, set to loop, or repeat. Loop repeats repeats the animation
     * in reverse every time. Repeat will run the original tween from the beginning
     * @returns {self}
     */
    window.Tween.prototype.set = function (startValue, distance, duration, animationType, loop) {
        this.startValue = typeof startValue === 'number' ? startValue : this.startValue;
        this.distance = typeof distance === 'number' ? distance : this.distance;
        this.duration = typeof duration === 'number' ? duration : this.duration;
        this.animationType = animationType || this.animationType;
        this.loop = loop || this.loop;

        return this;
    };

    /**
     * Resets the tween and runs it relative to the current time
     * @returns {self}
     */
    window.Tween.prototype.reset = function () {
        this.startTime = Date.now();

        return this;
    };
}(window));