
import ResponseHandler from "../ResponseHandler";

export default class ConversationSpawner {

    currentConversation : Conversation;

    constructor(psid : string) {
        this.currentConversation = new WelcomeConversation(psid);
    }

    continueConversation(req : any) {
        if (this.currentConversation.hasNext()) {
            this.currentConversation.continue(req);
        }

        else {
            this.currentConversation = this.currentConversation.nextConversation;
            this.currentConversation.continue(req);
        }
    }


}



export abstract class Conversation {

    responseSender : ResponseHandler;
    thisUser : string;
    nextStep : (req : any) => void;
    nextConversation : Conversation;

    constructor(psid : string) {
        this.thisUser = psid;
        this.responseSender = new ResponseHandler(psid);
    }

    hasNext() : boolean {
        return (!this.nextStep);
    }

    abstract continue(req : any) : void;
}

export class PreferencesConversation extends Conversation {

    fieldToUpdate : string = "";
    valueToReplace : string = "";


    constructor(psid : string) {
        super(psid);
    }


    continue(req : any) : void {
        this.nextStep(req);

    }

    askInitialQuestion(req : any) {
        let greeting : string = "Would you like to update your preferences?";
        // res, req

        this.responseSender.sendResponse(greeting);
        this.nextStep = this.handleUpdatePreferencesResponse;
    }

    handleUpdatePreferencesResponse(req : any) {
        if (this.cleanString(req.body) === 'no') {
            this.nextStep = this.goodbye;
        } else {
            this.nextStep = this.askWhichFields;
        }
    }
    askWhichFields(req : any) {
        let fieldOptions : string = "Would you like to update: name, location?";
        this.responseSender.sendResponse(fieldOptions);
        this.nextStep = this.handleFieldsResponse;

    }

    handleFieldsResponse(req : any) {
        let response = req.body;
        // really elementary
        let fieldToChange = response;

    }

    askWhatValue(req : any) {
        let prompt = "What would you like to change the value of " + this.fieldToUpdate + " to?";
        this.responseSender.sendResponse(prompt);
        this.nextStep = this.askResult;
    }


    askTryAgain(req : any) {
        let askAgain : string = "Sorry, I didn't quite catch that. Could you repeat it? Please keep your responses as simple as possible.";
        this.responseSender.sendResponse(askAgain);
        this.nextStep = this.askWhichFields;

    }

    askResult(req : any) {
        this.valueToReplace = req.body;
        //User.updateValue; // doesn't exist yet
        let result = "Updating " + this.fieldToUpdate + " to " + this.valueToReplace;
        this.responseSender.sendResponse(result);
        // actually change it now
    }

    goodbye(req : any) {
        // actually should move on to next response - maybe hold a response object?

        // return a flag to indicate that next function doesn't exist
    }

    cleanString(toReplace : string) : string {
        return toReplace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
    }

    finish() {
        this.nextConversation; // !!! need to set it here to the next thing!
    }


}


export class WelcomeConversation extends Conversation {
    continue(req: any): void {
        this.nextConversation = new PreferencesConversation(this.thisUser);
        console.log("Setting next conversation");
        this.responseSender.sendResponse("Hello!");
    }

    hasNext() {
        return false;
    }

}

export class WaitingConversation extends Conversation {
    //hasnext should be like a waiting or something

    nextConversation = new WelcomeConversation(this.thisUser);

    continue(req: any): void {

    }

    hasNext() {
        return false;
    }


}