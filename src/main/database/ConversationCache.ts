const NodeCache = require("node-cache");
import {ConversationInterceptor} from "../response/conversation/ConversationInterceptor";

export default class ConversationCache {
    static idCache = new NodeCache();

    // cache the id and the response handler unique to each person

    private constructor() {}

    static addKey(psid : string) : ConversationInterceptor { // synchronization
        let conversationHandler = new ConversationInterceptor(psid);
        ConversationCache.idCache.set({psid: conversationHandler}, function(err : any, res : any) {
            if (err) {
                console.log(err);
            }
        });
        return conversationHandler; // doesn't need to be async, but I guess I could refactor with promises if necessary
    }

    static getConversation(psid : string) {
        try {
            console.log("Trying to get a conversation for cus");
            ConversationCache.idCache.get(psid);
        } catch (err) {
            if (err) {
                // do something... lol
                console.log("Something bad happened in getConversation");
            }
            return this.addKey(psid);
        }
    }
}