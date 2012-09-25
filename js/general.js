/*
Name: Canvas SAT Demo
Version: 1.0
Author: Ashton Blue
Author URL: http://blueashes.com
*/

// How to figure out what a user's computer can handle for frames with fallbacks
// Original by Paul Irish: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame         ||
    window.webkitRequestAnimationFrame          ||
    window.mozRequestAnimationFrame             ||
    window.oRequestAnimationFrame               ||
    window.msRequestAnimationFrame              ||
    function (callback, element){
        return window.setTimeout(callback, 1000 / 60);
    };
}());

var game = {
    // Setup configuration
    canvas: document.getElementById('canvas'),
    satDelay: true,
    satCount: 0,
    setup: function() {
        if (this.canvas.getContext){
            // Setup variables
            this.ctx = this.canvas.getContext('2d');

            // Run the game
            this.init();
            this.animate();
        }
    },

    init: function() {
        square.init();
    },

    animate: function() {
        // Create delta
        game.time = Date.now();
        game.delta = game.time - (game.timeNow || game.time);

        game.draw();
        game.play = window.requestAnimFrame(game.animate);

        // Remember delta location
        game.timeNow = game.time;
    },

    draw: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw objects
        square.update();
        square.draw();
    }
};

var square = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    distance: 300,
    duration: 1000,

    init: function () {
        this.tweenX = new Tween(this.x, this.distance, this.duration, 'linear');
        this.tweenY = new Tween(this.y, this.distance, this.duration, 'quadInOut');
    },

    update: function () {
        this.x = this.tweenX.getValue();
        this.y = this.tweenY.getValue();
    },

    draw: function () {
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

window.onload = function () {
    game.setup();
};