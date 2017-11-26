import { Conversation, WelcomeConversation } from "./Conversation";

export default class ConversationController {

    currentConversation : Conversation;

    constructor(psid : string) {
        this.currentConversation = new WelcomeConversation(psid);
        console.log("made a NEW conversationspawner");
    }

    continueConversation(req : any) {
        if (this.naturalRecursion(req)) {
            this.currentConversation.trustTheNaturalRecursion();
        }

        if (this.currentConversation.hasNext()) {
            console.log("Continue with current convo");
            this.currentConversation.continue(req);
        }

        else {
            console.log("New convo");
            if (this.currentConversation.nextConversation != undefined) {
                this.currentConversation = this.currentConversation.nextConversation;
                this.currentConversation.continue(req);
            }
        }
    }

    naturalRecursion(req : string) : boolean {
        return req.includes("recursion");
    }

    setLocation(choice : string, payload : string) {
        console.log("location: ", payload);
        this.currentConversation.responseSender.sendResponse("So you are at " + payload + "?");

    }


}