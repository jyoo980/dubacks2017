"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var 
        //bodyParser = require('body-parser'),
        express = require('express'), app = express(), //.use(bodyParser.json);
        https = require('https'), fs = require('fs');
        var port = process.env.PORT || 443;
        var options = {
            key: fs.readFileSync("/etc/letsencrypt/live/dubbyfoods.ca/privkey.pem"),
            cert: fs.readFileSync('/etc/letsencrypt/live/dubbyfoods.ca/fullchain.pem')
        };
        https.createServer(options, app).listen(port, function () {
            console.log('webhook is listening');
        });
        app.get("/", function (req, res) { return res.send("GET REQUEST SUCCESSFUL\n"); });
        // POST creates endpoint for webhook
        app.post('/webhook', function (req, res) {
            console.log("Into webhook");
            var body = req.body;
            // Verify this is event from page subscription
            if (body.object == 'page') {
                console.log("From page");
                // Iterate over entries
                body.entry.foreach(function (entry) {
                    var webhookEvent = entry.messaging[0];
                    console.log(webhookEvent);
                    if (entry.message) {
                        console.log(entry.message);
                        //   let conversation : Conversation = new WelcomeConversation(webhookEvent.sender.id);
                        //   conversation.continue(req, res); // need to get a conversation unique to each person
                        res.status(200).send(entry.message);
                    }
                    console.log(webhookEvent);
                });
                // Returns '200 OK' response to all requests
                res.status(200).send('EVENT_RECEIVED\n');
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
                    console.log('WEBHOOK_VERIFIED\n');
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
