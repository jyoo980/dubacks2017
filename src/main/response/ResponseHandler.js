"use strict";
const NodeCache = require("node-cache");
class ResponseHandler {
}
class DataCache {
    constructor() { }
    addKey(psid, name) {
        DataCache.idCache.set({ psid: name }, function (err, res) {
            if (res) {
                console.log("Don't know what went wrong here");
            }
        });
    }
    getName(psid) {
        // yet to implement
    }
    getProfileInformation() {
    }
}
DataCache.idCache = new NodeCache();
