import * as https from "https";

export default class Listener {



    main() {

        const
            //bodyParser = require('body-parser'),
            express = require('express'),
            app = express(),//.use(bodyParser.json);
            https = require('https'),
            fs = require('fs');


        let port = process.env.PORT || 443;

        let options = {
            key: fs.readFileSync("/etc/letsencrypt/live/dubbyfoods.ca/privkey.pem"),
            cert: fs.readFileSync('/etc/letsencrypt/live/dubbyfoods.ca/fullchain.pem')
        };

        https.createServer(options, app).listen(port, function() {
            console.log('webhook is listening');
        });

        app.get("/", (req: any, res: any) => res.send("GET REQUEST SUCCESSFUL\n"));

        // POST creates endpoint for webhook
        app.post('/webhook', (req: any, res: any) => {


            let body = req.body;

            // Verify this is event from page subscription
            if (body.object == 'page') {

                // Iterate over entries
                body.entry.foreach(function (entry: any) {

                    let webhookEvent = entry.messaging[0];

                    if (entry.message) {
                     //   let conversation : Conversation = new WelcomeConversation(webhookEvent.sender.id);
                     //   conversation.continue(req, res); // need to get a conversation unique to each person
                        res.status(200).send(entry.message);
                    }

                    console.log(webhookEvent);
                });

                // Returns '200 OK' response to all requests
                res.status(200).send('EVENT_RECEIVED\n');
            } else {

                // Return '404 NOT FOUND' response if the event is not from a page subsc.
                res.sendStatus(404);
            }


        });


        // GET request support with code below
        app.get('/webhook', (req: any, res: any) => {

            // VERIFY TOKEN
            let VERIFY_TOKEN = "VTOKEN";

            // Parse query param. for GET
            let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
            let challenge = req.query['hub.challenge'];

            // Check if both token, mode is in the query string of request
            if (mode && token) {

                if (mode === 'subscribe' && token == VERIFY_TOKEN) {

                    // Respond with challenge token from request
                    console.log('WEBHOOK_VERIFIED\n');
                    res.status(200).send(challenge);
                } else {
                    // Respond with '403 FORBIDDEN' if verify tokens do not match
                    res.sendStatus(403);
                }
            }
        });
    }

}