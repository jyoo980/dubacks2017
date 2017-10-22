"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = /** @class */ (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var bodyParser = require('body-parser'), express = require('express'), app = express().use(bodyParser.json);
        app.listen(process.env.PORT || 1337, function () { return console.log('webhook is listening'); });
    };
    return Listener;
}());
exports.default = Listener;
