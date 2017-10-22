
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAVRCYBeJgwBAD27bGm7xA4B7pBjfqzy7E9KqthUqJUD5lZAdXPCGYZBiWHk9sznZCHSEmXFYSWc6DNyZAfjKGeKZAED4bbt1g42hER6RMV9QDfdqOvdLQVJiK21Mymm3J7jIZCWfPLoOZCX48SHIgfWP5Yp7R7JaLqOZAwPWBxgCQZDZD";
const
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express().use(bodyParser.json()),
    https = require('https'),
    fs = require('fs'),
    request = require('request');


export default class Listener {



    main() {


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

            console.log("Into webhook");

            let body = req.body;

            console.log("hefksd;fjaskldf");

            // Verify this is event from page subscription
            if (body.object == 'page') {

                console.log("From page");

                let result = res.status(200);

                // Iterate over entries
                body.entry.forEach((entry: any) => {

                    let webhookEvent = entry.messaging[0];
                    console.log(webhookEvent);

                    if (webhookEvent.message) {
                        console.log(webhookEvent.message);
                     //   let conversation : Conversation = new WelcomeConversation(webhookEvent.sender.id);
                     //   conversation.continue(req, res); // need to get a conversation unique to each person

                        console.log("Going to send response");
                        this.sendResponse(webhookEvent.sender.id,
                            {"text": webhookEvent.message.text});
                        return;
                    }

                  //  console.log(webhookEvent);
                });

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

    sendResponse(psid : string, response : any) {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": psid
                },
                "message": response
            };

            console.log(request_body);

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v2.6/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err : any, res : any, body : any) => {
                if (!err) {
                    console.log('message sent!');
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        }

    }
