"use strict";
class ConversationSpawner {
    continueConversation(req, res) {
        if (this.currentConversation.hasNext()) {
            this.currentConversation.continue(req, res);
        }
        else {
            this.currentConversation = this.currentConversation.nextConversation;
            this.currentConversation.continue(req, res);
        }
    }
}
class Conversation {
    constructor(psid) {
        this.thisUser = psid;
    }
    hasNext() {
        return (!this.nextStep);
    }
}
class PreferencesConversation extends Conversation {
    constructor(psid) {
        super(psid);
        this.fieldToUpdate = "";
        this.valueToReplace = "";
    }
    continue(req, res) {
        this.nextStep(req, res);
    }
    askInitialQuestion(req, res) {
        let greeting = "Would you like to update your preferences?";
        // res, req
        res.status(200).send(greeting);
        this.nextStep = this.handleUpdatePreferencesResponse;
    }
    handleUpdatePreferencesResponse(req, res) {
        if (this.cleanString(req.body) === 'no') {
            this.nextStep = this.goodbye;
        }
        else {
            this.nextStep = this.askWhichFields;
        }
    }
    askWhichFields(req, res) {
        let fieldOptions = "Would you like to update: name, location?";
        res.status(200).send(fieldOptions);
        this.nextStep = this.handleFieldsResponse;
    }
    handleFieldsResponse(req, res) {
        let response = req.body;
        // really elementary
        let fieldToChange = response;
    }
    askWhatValue(req, res) {
        let prompt = "What would you like to change the value of " + this.fieldToUpdate + " to?";
        this.nextStep = this.askResult;
    }
    askTryAgain(req, res) {
        let askAgain = "Sorry, I didn't quite catch that. Could you repeat it? Please keep your responses as simple as possible.";
        res.status(200).send(askAgain);
        this.nextStep = this.askWhichFields;
    }
    askResult(req, res) {
        this.valueToReplace = req.body;
        //User.updateValue; // doesn't exist yet
        let result = "Updating " + this.fieldToUpdate + " to " + this.valueToReplace;
    }
    goodbye(req, res) {
        // actually should move on to next response - maybe hold a response object?
        // return a flag to indicate that next function doesn't exist
    }
    cleanString(toReplace) {
        return toReplace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
    }
    finish() {
        this.nextConversation; // !!! need to set it here to the next thing!
    }
}
class WelcomeConversation extends Conversation {
    continue(req, res) {
        this.nextConversation = new PreferencesConversation(this.thisUser);
    }
}
class WaitingConversation extends Conversation {
    constructor() {
        //hasnext should be like a waiting or something
        super(...arguments);
        this.nextConversation = new WelcomeConversation(this.thisUser);
    }
    continue(req, res) {
    }
    hasNext() {
        return false;
    }
}
