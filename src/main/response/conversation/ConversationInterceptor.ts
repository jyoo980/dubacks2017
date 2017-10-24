class RequestProcessor {

    psid : number;
    currentResponse : string;
    currentConversation : Conversation;

    handle(response : string, toUser : any) {
        this.currentResponse = response;
        if (this.shouldReset()) {
            this.interceptReset();
        } else if (this.shouldReport()) {
            this.interceptReport();
        } else {
            this.continueConversation(toUser);
        }
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

    private continueConversation(toUser : any) {
        while (this.currentConversation.hasNext) {
            this.currentConversation.continue(this.currentResponse, toUser);
        }

    }

    private interceptReset() {
        console.log("Not yet implemented")
    }
}