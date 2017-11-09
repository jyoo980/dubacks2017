
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

    addKey(psid : string) : Promise<ConversationInterceptor> { // synchronization
        let that = this;
        return new Promise(function (fulfill, reject) {
            let conversationHandler = new ConversationInterceptor(psid);
            console.log("Add key to cache - is this necessary");
            that.idCache.put(psid, conversationHandler); //function (err: any, res: any) {
               /* if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log("We got to adding the convohandler to cache"); */
                fulfill(conversationHandler);
            //});
        });
         // doesn't need to be async, but I guess I could refactor with promises if necessary
    }

    getConversation(psid : string) : Promise<ConversationInterceptor> {
        let that = this;
        return new Promise(function (fulfill, reject) {
                console.log("Trying to get a conversation for cus");
                let response = that.idCache.get(psid);
                if (response != null) {
                    console.log("Old convospawner exists");
                    fulfill(response);
                }

                that.addKey(psid).then(function (res: any) {
                    console.log("added convo");
                    fulfill(res);
                    console.log(JSON.stringify(that.idCache.keys()));
                }).catch(function (err) {
                    console.log(err);
                    console.log("Wtf is happening");
                    reject("U SUCK");
                });
        });
    }
}