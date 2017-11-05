
import {ConversationInterceptor} from "../response/conversation/ConversationInterceptor";

export default class ConversationCache {
    static idCache = require("memory-cache");

    // cache the id and the response handler unique to each person

    private constructor() {}

    static addKey(psid : string) : Promise<ConversationInterceptor> { // synchronization
        return new Promise(function (fulfill, reject) {
            let conversationHandler = new ConversationInterceptor(psid);

            ConversationCache.idCache.set(psid, conversationHandler, function (err: any, res: any) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log("We got to adding the convohandler to cache");
                fulfill(conversationHandler);
            });
        });
         // doesn't need to be async, but I guess I could refactor with promises if necessary
    }

    static getConversation(psid : string) : Promise<ConversationInterceptor> {
        let that = this;
        return new Promise(function (fulfill, reject) {
                console.log("Trying to get a conversation for cus");
                let response = ConversationCache.idCache.get(psid);
                if (response != null) {
                    console.log("Old convospawner exists");
                    fulfill(response);
                }

                that.addKey(psid).then(function (res: any) {
                    console.log("added convo");
                    fulfill(res);
                    console.log(JSON.stringify(ConversationCache.idCache));
                }).catch(function (err) {
                    console.log(err);
                    console.log("Wtf is happening");
                    reject("U SUCK");
                });
        });
    }
}