
import ResponseHandler from "../ResponseHandler";
import { ProfileCache } from "../../database/ConversationCache";
import {User} from "../../users/User";
import {SaleItem} from "../../item/SaleItem";

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
        return (this.nextStep != undefined);
    }

    cleanString(toReplace : string) : string {
        return toReplace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
    }

    trustTheNaturalRecursion() : void {
        this.responseSender.sendResponse("Trust the natural recursion :)");
    }

    abstract continue(req : any) : void;
}

export class PreferencesConversation extends Conversation {

    fieldToUpdate : string = "";
    valueToReplace : string = "";


    constructor(psid : string) {
        super(psid);
        console.log("New preferences convo");
        this.nextStep = this.askInitialQuestion;
    }

    continue(req : any) : void {
        console.log("Continuing prefernces convo");
        this.nextStep(req);

    }

    askInitialQuestion(req : any) {
        let greeting : string = "Would you like to update your preferences?";
        // res, req

        this.responseSender.sendResponse(greeting);
        this.nextStep = this.handleUpdatePreferencesResponse;
    }

    handleUpdatePreferencesResponse(req : any) {
        console.log("In updating");
        if (this.cleanString(req) === 'no') {
            this.nextStep = this.goodbye;
            console.log("bye");
        } else {
            console.log("move on");
            this.askWhichFields(req);
        }
    }
    askWhichFields(req : any) {
        console.log("Which fields");
        let fieldOptions : string = "Would you like to update: name, location, interested items?";
        this.responseSender.sendFieldsResponse(fieldOptions);
        //this.nextStep = this.handleFieldsResponse;
        this.nextStep = this.locationResponse;

    }

    askTryAgain(req : any) {
        let askAgain : string = "Sorry, I didn't quite catch that. Could you repeat it? Please keep your responses as simple as possible.";
        this.responseSender.sendResponse(askAgain);
        this.nextStep = this.askWhichFields;

    }

    goodbye(req : any) {
        console.log("bye");
        this.responseSender.sendResponse("Bye!");
        this.nextConversation = new WelcomeConversation(this.thisUser);
        // actually should move on to next response - maybe hold a response object?

        // return a flag to indicate that next function doesn't exist
    }

    locationResponse(req : any) {
        this.responseSender.sendLocationResponse("Where are you?");
        this.nextStep = this.finish;
    }

    finish(req : any) {
        this.responseSender.sendResponse("So now your location is" + ProfileCache.getPreferences(psid).get);
        this.nextConversation; // !!! need to set it here to the next thing!
    }

}


export class WelcomeConversation extends Conversation {
    doesHaveNext : boolean;

    constructor(psid : string) {
        super(psid);
        this.doesHaveNext = true;

        this.nextConversation = new PreferencesConversation(this.thisUser);
        console.log("Setting next conversation");
    }

    continue(req: any): void {
        this.responseSender.sendResponse("Hello!");
        this.doesHaveNext = false;
    }

    hasNext() {
        return this.doesHaveNext;
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

