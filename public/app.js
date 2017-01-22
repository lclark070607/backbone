(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// const HangmanModel = require('./models/ingredients'); //create models folder
// const HangmanView = require('./views/ingredients'); //create views folder

let testModule = require('./views');

window.addEventListener('load', function() {
    //Put this anywhere; normal scope rules will apply
    let testModule = require('./views');

    console.log('ready to rock');
});


},{"./views":2}],2:[function(require,module,exports){
function xyz() {
    return 10
}

module.exports = xyz;
},{}]},{},[1]);
