
const NodeCache = require("node-cache");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAVRCYBeJgwBAD27bGm7xA4B7pBjfqzy7E9KqthUqJUD5lZAdXPCGYZBiWHk9sznZCHSEmXFYSWc6DNyZAfjKGeKZAED4bbt1g42hER6RMV9QDfdqOvdLQVJiK21Mymm3J7jIZCWfPLoOZCX48SHIgfWP5Yp7R7JaLqOZAwPWBxgCQZDZD";
const request = require('request');

export default class ResponseHandler {

    psid : string;

    constructor(id : string) {
        this.psid = id;
    }

    sendResponse(response : any) {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": this.psid
            },
            "message": response
        };

        console.log(request_body);

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN }, //application-json
            "method": "POST",
            "json": request_body
        }, (err : any, res : any, body : any) => {
            if (!err) {
                console.log('message sent!');
                console.log(res);
                console.log(body);
            } else {
                console.error("Unable to send message:" + err);
                // do more checking
            }
        });
    }
// request-promise-native perhaps


}
