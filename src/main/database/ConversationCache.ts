
import {ConversationInterceptor} from "../response/conversation/ConversationInterceptor";

class Cache {
    private static cache : Cache;

    public static getInstance() : Cache {
        if (this.cache == null) {
            this.cache = new Cache();
        }
        return this.cache;
    }

    protected constructor() {
        console.log("Making a new cache, for some reason?");
    }
}

export default class ConversationCache extends Cache {
    private idCache = require('memory-cache');

    private constructor() {
        super();
    }

    // cache the id and the response handler unique to each person

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

export class ProfileCache extends Cache {
    private profileCache = require('memory-cache');

}