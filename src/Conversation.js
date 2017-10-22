"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ConversationSpawner = (function () {
    function ConversationSpawner() {
    }
    ConversationSpawner.prototype.continueConversation = function (req, res) {
        if (this.currentConversation.hasNext()) {
            this.currentConversation.continue(req, res);
        }
        else {
            this.currentConversation = this.currentConversation.nextConversation;
            this.currentConversation.continue(req, res);
        }
    };
    return ConversationSpawner;
}());
var Conversation = (function () {
    function Conversation(psid) {
        this.thisUser = psid;
    }
    Conversation.prototype.hasNext = function () {
        return (!this.nextStep);
    };
    return Conversation;
}());
var PreferencesConversation = (function (_super) {
    __extends(PreferencesConversation, _super);
    function PreferencesConversation(psid) {
        var _this = _super.call(this, psid) || this;
        _this.fieldToUpdate = "";
        _this.valueToReplace = "";
        return _this;
    }
    PreferencesConversation.prototype.continue = function (req, res) {
        this.nextStep(req, res);
    };
    PreferencesConversation.prototype.askInitialQuestion = function (req, res) {
        var greeting = "Would you like to update your preferences?";
        // res, req
        res.status(200).send(greeting);
        this.nextStep = this.handleUpdatePreferencesResponse;
    };
    PreferencesConversation.prototype.handleUpdatePreferencesResponse = function (req, res) {
        if (this.cleanString(req.body) === 'no') {
            this.nextStep = this.goodbye;
        }
        else {
            this.nextStep = this.askWhichFields;
        }
    };
    PreferencesConversation.prototype.askWhichFields = function (req, res) {
        var fieldOptions = "Would you like to update: name, location?";
        res.status(200).send(fieldOptions);
        this.nextStep = this.handleFieldsResponse;
    };
    PreferencesConversation.prototype.handleFieldsResponse = function (req, res) {
        var response = req.body;
        // really elementary
        var fieldToChange = response;
    };
    PreferencesConversation.prototype.askWhatValue = function (req, res) {
        var prompt = "What would you like to change the value of " + this.fieldToUpdate + " to?";
        this.nextStep = this.askResult;
    };
    PreferencesConversation.prototype.askTryAgain = function (req, res) {
        var askAgain = "Sorry, I didn't quite catch that. Could you repeat it? Please keep your responses as simple as possible.";
        res.status(200).send(askAgain);
        this.nextStep = this.askWhichFields;
    };
    PreferencesConversation.prototype.askResult = function (req, res) {
        this.valueToReplace = req.body;
        //User.updateValue; // doesn't exist yet
        var result = "Updating " + this.fieldToUpdate + " to " + this.valueToReplace;
    };
    PreferencesConversation.prototype.goodbye = function (req, res) {
        // actually should move on to next conversation - maybe hold a conversation object?
        // return a flag to indicate that next function doesn't exist
    };
    PreferencesConversation.prototype.cleanString = function (toReplace) {
        return toReplace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
    };
    PreferencesConversation.prototype.finish = function () {
        this.nextConversation; // !!! need to set it here to the next thing!
    };
    return PreferencesConversation;
}(Conversation));
var WelcomeConversation = (function (_super) {
    __extends(WelcomeConversation, _super);
    function WelcomeConversation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WelcomeConversation.prototype.continue = function (req, res) {
    };
    return WelcomeConversation;
}(Conversation));
var WaitingConversation = (function (_super) {
    __extends(WaitingConversation, _super);
    function WaitingConversation() {
        //hasnext should be like a waiting or something
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextConversation = new WelcomeConversation(_this.thisUser);
        return _this;
    }
    WaitingConversation.prototype.continue = function (req, res) {
    };
    WaitingConversation.prototype.hasNext = function () {
        return false;
    };
    return WaitingConversation;
}(Conversation));
