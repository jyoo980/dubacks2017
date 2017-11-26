import ConversationController from "./ConversationController";
import ResponseHandler from "../ResponseHandler";

export class ResponseInterceptor {

    psid : string;
    currentResponse : string;
    currentConversation : ConversationController;

    constructor(psid : string) {
        this.psid = psid;
        this.currentConversation = new ConversationController(psid);
        console.log("making a new conversationinterruptor");
    }

    handle(response : string) {
        console.log("ready to handle");
        this.currentResponse = response;
        console.log("put out this response" + this.currentResponse);
        if (this.shouldReset()) {
            console.log("Should reset");
            this.interceptReset();
        } else if (this.shouldReport()) {
            console.log("Should report");
            this.interceptReport();
        } else {
            console.log("Continuing conversation");
            this.currentConversation.continueConversation(this.currentResponse);
        }
    }

    setLocation(choice : string, payload : string) {
        QuickResponseInterceptor.handle(this.psid, choice, payload);
    }

    resetCurrentString(newString : string) {
        this.currentResponse = newString;
    }

    shouldReset() {
        return this.isStringEqualTo("reset")
    }

    shouldReport() {
        return this.isStringEqualTo("report");
    }

    isStringEqualTo(searchFor : string) : boolean {
        let interrupt : boolean = false;
        let toCheck : string = this.currentResponse.trim().toLowerCase();
        if (toCheck === searchFor) {
            interrupt = true;
        }
        return interrupt;
    }

    private interceptReport() {
        console.log("Not yet implemented")
    }

    private interceptReset() {
        console.log("Not yet implemented")
    }
}

export enum QuickResponses {
    LOCATION,
    FIELDS
}

export class QuickResponseInterceptor {

    static toString(response : QuickResponses) : string {
        return QuickResponses[response];
}

    static doLocationResponse() : string {
        // update the thing and return value
        return "updated something, presumably";
    }

    static chooseFieldResponse(response : string, selection : string) {
        return "Okay, setting field " + response + " to " + selection;
    }

    static getResponse(response : string, selection : string) : string {
        switch (selection) { //response
            case (this.toString(QuickResponses.LOCATION)) :
                return this.doLocationResponse();
            case (this.toString(QuickResponses.FIELDS)):
                return this.chooseFieldResponse(response, selection);
            default:
                return "default";
        }
    }

    static handle(psid: string, res: string, selection: string) {
        let response : string = this.getResponse(res, selection);
        ResponseHandler.sendResponse(response, psid);
    }


}