"use strict";
var SaleItem = (function () {
    /**
     *
     * @param {string} name         : name of the item for sale
     * @param {number} price        : cost of the item for sale
     * @param {string} description  : brief description of item (user provided)
     * @param {string} category     : category of the item for sale
     */
    function SaleItem(name, price, description, category) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }
    // getters
    SaleItem.prototype.getName = function () { return this.name; };
    SaleItem.prototype.getPrice = function () { return this.price; };
    SaleItem.prototype.getDescription = function () { return this.description; };
    SaleItem.prototype.getCategory = function () { return this.category; };
    return SaleItem;
}());
