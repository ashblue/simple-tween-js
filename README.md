Simple Tween JS
=================

Simple Tween JS is a microframework for your other projects that allows you to easily integrate Tweens by dropping in a file. The performance is quite optimized and has a minimal impact on your application. Its originally designed for HTML Canvas JavaScript applications, but you can use it for just about anything JavaScript related.

Live demo at http://ashblue.github.com/canvas-tween-demo/ (demo broken in IE9, but
the library does work and has been tested in IE9)

##Setup

1. Download the minified or regular tween.js file and place it in your project files
2. Include the tween script at the bottom of your page, before your other JavaScript files
    ```
    <script type="text/javascript" src="tween.min.js"></script>
    ```
3. You can now create new tweens with syntax similar to the following.
    ```javascript
    var myTween = new Tween(startValue, distance, duration, animationType, loop);
    ```

##Browser Support
Known to be stable in the following browsers. Could very well work in older versions
such as IE8, haven't tested. Mainly because the demo is written in HTML5's Canvas.

* Google Chrome - 22+
* Safari - 6+
* Firefox - 15+
* Internet Exploror - 9+
* Opera - 12+

##Usage Guide
1. Create a new Tween object
    ```
    var myTween = new Tween(startValue, distance, duration, animationType, loop);
    ```
2. You can then get the tween's current value by calling getValue
    ```
    myTween.getValue();
    ```
3. See the below methods / docs for more things you can do

###Methods / Docs


###How to make your tweens process faster
The library here uses Date.now() to get the current time. If your JavaScript application
already has a cached value of the current time, you can substitute all references to Date.now()
with it.