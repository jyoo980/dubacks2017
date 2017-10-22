class SaleItem {

    name : string;
    price : number;
    description : string;
    category: string;

    /**
     *
     * @param {string} name         : name of the item for sale
     * @param {number} price        : cost of the item for sale
     * @param {string} description  : brief description of item (user provided)
     * @param {string} category     : category of the item for sale
     */
    constructor(name : string, price : number, description : string, category : string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }

    // getters
    getName() { return this.name; }
    getPrice() { return this.price; }
    getDescription() { return this.description; }
    getCategory() { return this.category; }

}