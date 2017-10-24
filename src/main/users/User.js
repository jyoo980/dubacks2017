"use strict";
class User {
    /**
     *
     * @param {string} name:        name of the user
     * @param {boolean} isSelling:  true if this user is selling, else false
     * @param {boolean} isBuying:   true if this user is buying, else false
     */
    constructor(name, isSelling, isBuying) {
        this.name = name;
        this.isSelling = isSelling;
        this.isBuying = isBuying;
    }
    // getters
    getName() { return this.name; }
    hasForSale() { return this.isSelling; }
    lookingToBuy() { return this.isBuying; }
}
