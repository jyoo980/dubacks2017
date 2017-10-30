const NodeCache = require("node-cache");
import {ConversationInterceptor} from "../response/conversation/ConversationInterceptor";

export default class ConversationCache {
    static idCache = new NodeCache();

    // cache the id and the response handler unique to each person

    private constructor() {}

    static addKey(psid : string) : Promise<ConversationInterceptor> { // synchronization
        return new Promise(function (fulfill, reject) {
            let conversationHandler = new ConversationInterceptor(psid);

            ConversationCache.idCache.set({psid: conversationHandler}, function (err: any, res: any) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                fulfill(conversationHandler);
            });
        });
         // doesn't need to be async, but I guess I could refactor with promises if necessary
    }

    static getConversation(psid : string) {
        try {
            console.log("Trying to get a conversation for cus");
            return ConversationCache.idCache.get(psid);
        } catch (err) {
            if (err) {
                // do something... lol
                console.log("Something bad happened in getConversation");
            }
            this.addKey(psid).then(function (res: any) {
                return res;
            }).catch(function(err) {
                console.log(err);
                return new ConversationInterceptor(psid);
            });

        }
    }
}