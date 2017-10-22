
class ConversationSpawner {

    currentConversation : Conversation;

    continueConversation(req : any, res : any) {
        if (this.currentConversation.hasNext()) {
            this.currentConversation.continue(req, res);
        }

        else {
            this.currentConversation = this.currentConversation.nextConversation;
            this.currentConversation.continue(req,res);
        }
    }


}



abstract class Conversation {

    thisUser : string;
    nextStep : (req : any, res : any) => void;
    nextConversation : Conversation;

    constructor(psid : string) {
        this.thisUser = psid;
    }

    hasNext() : boolean {
        return (!this.nextStep);
    }

    abstract continue(req : any, res : any) : void;
}

class PreferencesConversation extends Conversation {

    fieldToUpdate : string = "";
    valueToReplace : string = "";


    constructor(psid : string) {
        super(psid);
    }


    continue(req : any, res : any) : void {
        this.nextStep(req, res);

    }

    askInitialQuestion(req : any, res : any) {
        let greeting : string = "Would you like to update your preferences?";
        // res, req

        res.status(200).send(greeting);
        this.nextStep = this.handleUpdatePreferencesResponse;
    }

    handleUpdatePreferencesResponse(req : any, res : any) {
        if (this.cleanString(req.body) === 'no') {
            this.nextStep = this.goodbye;
        } else {
            this.nextStep = this.askWhichFields;
        }
    }
    askWhichFields(req : any, res : any) {
        let fieldOptions : string = "Would you like to update: name, location?";
        res.status(200).send(fieldOptions);
        this.nextStep = this.handleFieldsResponse;

    }

    handleFieldsResponse(req : any, res : any) {
        let response = req.body;
        // really elementary
        let fieldToChange = response;

    }

    askWhatValue(req : any, res : any) {
        let prompt = "What would you like to change the value of " + this.fieldToUpdate + " to?";
        this.nextStep = this.askResult;
    }


    askTryAgain(req : any, res : any) {
        let askAgain : string = "Sorry, I didn't quite catch that. Could you repeat it? Please keep your responses as simple as possible.";
        res.status(200).send(askAgain);
        this.nextStep = this.askWhichFields;

    }

    askResult(req : any, res : any) {
        this.valueToReplace = req.body;
        //User.updateValue; // doesn't exist yet
        let result = "Updating " + this.fieldToUpdate + " to " + this.valueToReplace;


    }

    goodbye(req : any, res : any) {
        // actually should move on to next conversation - maybe hold a conversation object?

        // return a flag to indicate that next function doesn't exist
    }

    cleanString(toReplace : string) : string {
        return toReplace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim().toLowerCase();
    }

    finish() {
        this.nextConversation; // !!! need to set it here to the next thing!
    }


}


class WelcomeConversation extends Conversation {
    continue(req: any, res: any): void {
    }

}

class WaitingConversation extends Conversation {
    //hasnext should be like a waiting or something

    nextConversation = new WelcomeConversation(this.thisUser);

    continue(req: any, res: any): void {

    }

    hasNext() {
        return false;
    }


}