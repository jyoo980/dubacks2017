"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConversationInterceptor {
    handle(response, toUser) {
        this.currentResponse = response;
        if (this.shouldReset()) {
            this.interceptReset();
        }
        else if (this.shouldReport()) {
            this.interceptReport();
        }
        else {
            this.continueConversation(toUser);
        }
    }
    shouldReset() {
        return this.isStringEqualTo("reset");
    }
    shouldReport() {
        return this.isStringEqualTo("report");
    }
    isStringEqualTo(searchFor) {
        let interrupt = false;
        let toCheck = this.currentResponse.trim().toLowerCase();
        if (toCheck === searchFor) {
            interrupt = true;
        }
        return interrupt;
    }
    interceptReport() {
        console.log("Not yet implemented");
    }
    continueConversation(toUser) {
        while (this.currentConversation.hasNext) {
            this.currentConversation.continue(this.currentResponse, toUser);
        }
    }
    interceptReset() {
        console.log("Not yet implemented");
    }
}
exports.ConversationInterceptor = ConversationInterceptor;
