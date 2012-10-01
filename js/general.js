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
    var TRAIL = document.getElementById('trail');
    var RUN = document.getElementById('run-animation');
    var LOOP = document.getElementById('loop');
    var REPEAT = document.getElementById('repeat');

    var _xAnimation = 'linear';
    var _yAnimation = 'linear';
    var _trail = false;
    var _loop = false;
    var _repeat = false;
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

            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
            square.tweenX = new Tween(parseInt(X_START.value, 10), parseInt(X_END.value, 10), parseInt(X_DURATION.value, 10), _xAnimation, _loop || _repeat);
            square.tweenY = new Tween(parseInt(Y_START.value, 10), parseInt(Y_END.value, 10), parseInt(Y_DURATION.value, 10), _yAnimation, _loop || _repeat);
        },

        clickCanvas: function (e) {
            // Force set distance relative to start
            X_END.value = e.pageX - this.offsetLeft - parseInt(X_START.value, 10);
            Y_END.value = e.pageY - this.offsetTop - parseInt(Y_START.value, 10);

            // Force click run
            RUN.click();
        },

        toggleTrail: function (e) {
            _trail = !_trail;
        },

        toggleLoop: function () {
            _loop = _loop ? false : 'loop';
        },

        toggleRepeat: function () {
            _repeat = _repeat ? false : 'repeat';
        }
    };

    game = {
        canvas: document.getElementById('canvas'),

        setup: function() {
            if (this.canvas.getContext) {
                this.bind();

                // Setup variables
                this.ctx = this.canvas.getContext('2d');

                // Run the game
                this.init();
                this.animate();
            }
        },

        bind: function () {
            // Animations
            for (var i = X_BTNS.length; i--;) {
                X_BTNS[i].addEventListener('click', _events.setXAnimation);
            }

            for (i = Y_BTNS.length; i--;) {
                Y_BTNS[i].addEventListener('click', _events.setYAnimation);
            }

            // Checkboxes
            TRAIL.addEventListener('click', _events.toggleTrail);
            LOOP.addEventListener('click', _events.toggleLoop);
            REPEAT.addEventListener('click', _events.toggleRepeat);

            this.canvas.addEventListener('click', _events.clickCanvas);

            RUN.addEventListener('click', _events.runTween);
        },

        init: function() {
            square.init();
        },

        animate: function() {
            if (!_trail) {
                game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
            }

            // Create delta
            game.time = Date.now();
            game.delta = game.time - (game.timeNow || game.time);

            game.draw();
            game.play = window.requestAnimFrame(game.animate);

            // Remember delta location
            game.timeNow = game.time;
        },

        draw: function() {
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