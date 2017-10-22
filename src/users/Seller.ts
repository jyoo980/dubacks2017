class Seller extends User {

    itemsForSale : Array<SaleItem>;

    /**
     *
     * @param {string} name: the name of the seller
     * Note: isSelling set to true, isBuying set to false as default
     *
     */
    constructor(name : string) {
        super(name, true, false);
    }
    

}