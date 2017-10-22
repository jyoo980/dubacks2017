"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var bodyParser = require('body-parser'), express = require('express'), app = express().use(bodyParser.json);
        app.listen(process.env.PORT || 5151, function () { return console.log('webhook is listening'); });
        app.get("/", function (req, res) { return res.send("??? successful get request"); });
        // POST creates endpoint for webhook
        app.post('/webhook', function (req, res) {
            var body = req.body;
            // Verify this is event from page subscription
            if (body.object == 'page') {
                // Iterate over entries
                body.entry.foreach(function (entry) {
                    var webhookEvent = entry.messaging[0];
                    console.log(webhookEvent);
                });
                // Returns '200 OK' response to all requests
                res.status(200).send('EVENT_RECEIVED');
            }
            else {
                // Return '404 NOT FOUND' response if the event is not from a page subsc.
                res.sendStatus(404);
            }
        });
        // GET request support with code below
        app.get('/webhook', function (req, res) {
            // VERIFY TOKEN
            var VERIFY_TOKEN = "VTOKEN";
            // Parse query param. for GET
            var mode = req.query['hub.mode'];
            var token = req.query['hub.verify_token'];
            var challenge = req.query['hub.challenge'];
            // Check if both token, mode is in the query string of request
            if (mode && token) {
                if (mode === 'subscribe' && token == VERIFY_TOKEN) {
                    // Respond with challenge token from request
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);
                }
                else {
                    // Respond with '403 FORBIDDEN' if verify tokens do not match
                    res.sendStatus(403);
                }
            }
        });
    };
    return Listener;
}());
exports.default = Listener;
