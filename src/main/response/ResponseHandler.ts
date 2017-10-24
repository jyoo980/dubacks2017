const NodeCache = require("node-cache");


class ResponseHandler {

    // for now the data cache will be stored in here








}

class DataCache {
    static idCache = new NodeCache();


    private constructor() {}

    addKey(psid : string, name : string) {
        DataCache.idCache.set({psid: name}, function(err : any, res : any) {
            if (res) {
                console.log("Don't know what went wrong here");
            }
        })
    }

    getName(psid : string) {
        // yet to implement
    }

    getProfileInformation() {

    }


}