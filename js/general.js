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

var game;

(function (document) {
    // Grab dom elements
    var X_START = document.getElementById('x-start');
    var X_END = document.getElementById('x-end');
    var X_DURATION = document.getElementById('x-dur');
    var Y_START = document.getElementById('y-start');
    var Y_END = document.getElementById('y-end');
    var Y_DURATION = document.getElementById('y-dur');
    var X_BTNS = document.getElementsByClassName('btn-x');
    var Y_BTNS = document.getElementsByClassName('btn-y');
    var RUN = document.getElementById('run-animation');

    var _xAnimation = 'linear';
    var _yAnimation = 'linear';

    var square;

    var _events = {
        setXAnimation: function (e) {
            e.preventDefault();

            for (var i = X_BTNS.length; i--;) {
                X_BTNS[i].classList.remove('active');
            }
            this.classList.add('active');

            _xAnimation = this.dataset.tween;
        },

        setYAnimation: function (e) {
            e.preventDefault();

            for (var i = Y_BTNS.length; i--;) {
                Y_BTNS[i].classList.remove('active');
            }
            this.classList.add('active');

            _yAnimation = this.dataset.tween;
        },

        runTween: function (e) {
            e.preventDefault();

            square.tweenX = new Tween(parseInt(X_START.value, 10), parseInt(X_END.value, 10), parseInt(X_DURATION.value, 10), _xAnimation);
            square.tweenY = new Tween(parseInt(Y_START.value, 10), parseInt(Y_END.value, 10), parseInt(Y_DURATION.value, 10), _yAnimation);
        }
    };

    game = {
        canvas: document.getElementById('canvas'),

        setup: function() {
            if (this.canvas.getContext) {
                // Configure DOM elements
                for (var i = X_BTNS.length; i--;) {
                    X_BTNS[i].addEventListener('click', _events.setXAnimation);
                }

                for (var i = Y_BTNS.length; i--;) {
                    Y_BTNS[i].addEventListener('click', _events.setYAnimation);
                }

                RUN.addEventListener('click', _events.runTween);

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
            this.tweenY = new Tween(this.y, this.distance, this.duration, 'linear');
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
}(document));