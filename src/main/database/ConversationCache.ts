
import {ResponseInterceptor} from "../response/conversation/ResponseInterceptor";
import {Seller} from "../users/Seller";
import {User} from "../users/User";

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

    addKey(psid : string) : ResponseInterceptor { // synchronization
        let that = this;
            let conversationHandler = new ResponseInterceptor(psid);
            console.log("Add key to cache - is this necessary");
            that.idCache.put(psid, conversationHandler);
            return conversationHandler;
    }

    getConversation(psid : string) : ResponseInterceptor {
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
    private static profileCache = require('memory-cache');

    private constructor() {
        console.log("Haha, profile cache should only be instantiated one time!");
    }

    private static addKey(name : string, psid : string) : User { // synchronization
        let that = this;
        let profile = new Seller(name, psid);
        console.log("Add key to cache - is this necessary");
        that.profileCache.put(psid, profile);
        return profile;
    }

    public static getPreferences(psid : string) {
        let that = this;
        console.log("Trying to get a profile for cus");
        let response = that.profileCache.get(psid);
        if (response != null) {
            console.log("Old profile exists");
            return response;
        }
        console.log("added convo");
        console.log(JSON.stringify(that.profileCache.keys()));

        // !!! two versions, one that auto-adds, other that doesn;t...
        return that.addKey(psid, psid);
    }

    // add and remove profile information

}