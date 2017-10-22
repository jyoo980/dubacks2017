"use strict";
exports.__esModule = true;
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var bodyParser = require('body-parser'), express = require('express'), app = express().use(bodyParser.json);
        app.listen(process.env.PORT || 1337, function () { return console.log('webhook is listening'); });
    };
    return Listener;
}());
exports["default"] = Listener;
