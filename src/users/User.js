"use strict";
var User = (function () {
    /**
     *
     * @param {string} name:        name of the user
     * @param {boolean} isSelling:  true if this user is selling, else false
     * @param {boolean} isBuying:   true if this user is buying, else false
     */
    function User(name, isSelling, isBuying) {
        this.name = name;
        this.isSelling = isSelling;
        this.isBuying = isBuying;
    }
    // getters
    User.prototype.getName = function () { return this.name; };
    User.prototype.hasForSale = function () { return this.isSelling; };
    User.prototype.lookingToBuy = function () { return this.isBuying; };
    return User;
}());
