import ResponseHandler from "../ResponseHandler";
import ConversationSpawner from "./Conversation";

export class ConversationInterceptor {

    psid : string;
    currentResponse : string;
    currentConversation : ConversationSpawner;

    constructor(psid : string) {
        this.psid = psid;
    }

    handle(response : string) {
        console.log("ready to handle");
        this.currentResponse = response;
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