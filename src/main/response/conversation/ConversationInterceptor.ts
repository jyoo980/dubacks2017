import ResponseHandler from "../ResponseHandler";
import ConversationSpawner from "./Conversation";

export class ConversationInterceptor {

    psid : string;
    currentResponse : string;
    currentConversation : ConversationSpawner;

    constructor(psid : string) {
        this.psid = psid;
    }

    handle(response : string, toUser : any) {
        this.currentResponse = response;
        if (this.shouldReset()) {
            this.interceptReset();
        } else if (this.shouldReport()) {
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