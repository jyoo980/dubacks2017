"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var bodyParser = require('body-parser'), express = require('express'), app = express().use(bodyParser.json);
        app.listen(process.env.PORT || 5151, function () { return console.log('webhook is listening'); });
        app.get("/", function (req, res) { return res.send("??? successful get request"); });
    };
    return Listener;
}());
exports.default = Listener;
