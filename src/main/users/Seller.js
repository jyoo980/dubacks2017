"use strict";
class Seller extends User {
    /**
     *
     * @param {string} name: the name of the seller
     * Note: isSelling set to true, isBuying set to false as default
     *
     */
    constructor(name) {
        super(name, true, false);
    }
}
