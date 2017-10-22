"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Seller = (function (_super) {
    __extends(Seller, _super);
    /**
     *
     * @param {string} name: the name of the seller
     * Note: isSelling set to true, isBuying set to false as default
     *
     */
    function Seller(name) {
        return _super.call(this, name, true, false) || this;
    }
    return Seller;
}(User));
