export abstract class User {

    protected name : string;
    protected isSelling : boolean;
    protected isBuying : boolean;

    /**
     *
     * @param {string} name:        name of the user
     * @param {boolean} isSelling:  true if this user is selling, else false
     * @param {boolean} isBuying:   true if this user is buying, else false
     */
    constructor(name : string, isSelling : boolean, isBuying : boolean) {
        this.name = name;
        this.isSelling = isSelling;
        this.isBuying = isBuying;
    }

    // getters
    getName() { return this.name; }
    hasForSale() { return this.isSelling; }
    lookingToBuy() { return this.isBuying; }


}