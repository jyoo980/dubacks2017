
import {ConversationInterceptor} from "../response/conversation/ConversationInterceptor";

export default class ConversationCache {
    private idCache = require('memory-cache');
    private static cache : ConversationCache;

    // cache the id and the response handler unique to each person

    public static getInstance() : ConversationCache {
        if (this.cache == null) {
            this.cache = new ConversationCache();
        }
        return this.cache;
    }

    private constructor() {
        console.log("Making a new cache, for some reason?");
    }

    addKey(psid : string) : ConversationInterceptor { // synchronization
        let that = this;
            let conversationHandler = new ConversationInterceptor(psid);
            console.log("Add key to cache - is this necessary");
            that.idCache.put(psid, conversationHandler);
            return conversationHandler;
    }

    getConversation(psid : string) : ConversationInterceptor {
        let that = this;
                console.log("Trying to get a conversation for cus");
                let response = that.idCache.get(psid);
                if (response != null) {
                    console.log("Old convospawner exists");
                    return response;
                }
                console.log("added convo");
                console.log(JSON.stringify(that.idCache.keys()));

                return that.addKey(psid);

    }
}

export class ProfileCache {
    private profileCache = require('memory-cache');
    private static cache : ProfileCache;

    public static getInstance() : ProfileCache {
        if (this.cache == null) {
            this.cache = new ProfileCache();
        }
        return this.cache;
    }

    private constructor() {
        console.log("Making a new cache, for some reason?");
    }

    // add and remove profile information

}