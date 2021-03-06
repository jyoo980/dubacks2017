
import {ResponseInterceptor} from "./conversation/ResponseInterceptor";
import ConversationCache from "../database/ConversationCache";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAVRCYBeJgwBAD27bGm7xA4B7pBjfqzy7E9KqthUqJUD5lZAdXPCGYZBiWHk9sznZCHSEmXFYSWc6DNyZAfjKGeKZAED4bbt1g42hER6RMV9QDfdqOvdLQVJiK21Mymm3J7jIZCWfPLoOZCX48SHIgfWP5Yp7R7JaLqOZAwPWBxgCQZDZD";
const
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express().use(bodyParser.json()),
    https = require('https'),
    fs = require('fs'),
    request = require('request');


export default class MessageHook {

    cache : ConversationCache;


    main() {

        this.cache = ConversationCache.getInstance();

        // VERIFY TOKEN
        let VERIFY_TOKEN = "VTOKEN";

        /*app.use(bodyParser.urlencoded({
            extended: true
        }));*/

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

                console.log("From page");

                let result = res.status(200);

                // Iterate over entries
                this.processNormalMessage(res, body);

                // Returns '200 OK' response to all requests
                result.send('EVENT_RECEIVED\n');
            } else {

                // Return '404 NOT FOUND' response if the event is not from a page subsc.
                res.sendStatus(404);
                console.log("404 returned");
            }


        });


        // GET request support with code below
        app.get('/webhook', (req: any, res: any) => {


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

    processNormalMessage(res : any, body : any) {
        body.entry.forEach((entry: any) => {
//we would need to intercept if body has a payload
            console.log("processing message");
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            let message = webhookEvent.message;
            if (message) {
                console.log(message);

                let psid = webhookEvent.sender.id;
                let handler: ResponseInterceptor = this.cache.getConversation(psid);
                if (handler != undefined) {

                    if (message.quick_reply) {
                        console.log("quick reply exists");
                        let title = message.text;
                        let payload = message.quick_reply.payload;
                        handler.setLocation(title, payload);
                    } else {
                        console.log("Quick replydoesn't exist");
                        handler.handle(webhookEvent.message.text);
                    }
                } else {
                    console.log("For some reason, handler is undefined");
                }
            }
        });

        return;
    }


}


