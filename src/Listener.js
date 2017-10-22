"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var bodyParser = require('body-parser'), express = require('express'), app = express().use(bodyParser.json()), https = require('https'), fs = require('fs'), request = require('request');
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.main = function () {
        var _this = this;
        // VERIFY TOKEN
        var VERIFY_TOKEN = "VTOKEN";
        /*app.use(bodyParser.urlencoded({
            extended: true
        }));*/
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
            console.log("hefksd;fjaskldf");
            // Verify this is event from page subscription
            if (body.object == 'page') {
                console.log("From page");
                var result = res.status(200);
                // Iterate over entries
                body.entry.forEach(function (entry) {
                    var webhookEvent = entry.messaging[0];
                    console.log(webhookEvent);
                    if (webhookEvent.message) {
                        console.log(webhookEvent.message);
                        //   let conversation : Conversation = new WelcomeConversation(webhookEvent.sender.id);
                        //   conversation.continue(req, res); // need to get a conversation unique to each person
                        console.log("Going to send response");
                        _this.sendResponse(webhookEvent.sender.id, webhookEvent.message.text);
                        return;
                    }
                    //  console.log(webhookEvent);
                });
                // Returns '200 OK' response to all requests
                result.send('EVENT_RECEIVED\n');
            }
            else {
                // Return '404 NOT FOUND' response if the event is not from a page subsc.
                res.sendStatus(404);
                console.log("404 returned");
            }
        });
        // GET request support with code below
        app.get('/webhook', function (req, res) {
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
    Listener.prototype.sendResponse = function (psid, response) {
        // Construct the message body
        var request_body = {
            "recipient": {
                "id": psid
            },
            "message": response
        };
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, function (err, res, body) {
            if (!err) {
                console.log('message sent!');
            }
            else {
                console.error("Unable to send message:" + err);
            }
        });
    };
    return Listener;
}());
exports.default = Listener;
