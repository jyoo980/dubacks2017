import { SaleItem } from '../item/SaleItem';

export abstract class User {

    protected name: string;
    protected isSelling: boolean;
    protected isBuying: boolean;
    protected interestedItems: SaleItem[];

    /**
     *
     * @param {string} name:        name of the user
     * @param {boolean} isSelling:  true if this user is selling, else false
     * @param {boolean} isBuying:   true if this user is buying, else false
     */
    constructor(name: string, isSelling: boolean, isBuying: boolean) {
        this.name = name;
        this.isSelling = isSelling;
        this.isBuying = isBuying;
    }

    // getters
    getName() {
        return this.name;
    }

    setName(newName: string) {
        this.name = newName;
    }

    setIsSelling(isSelling: boolean) {
        this.isSelling = isSelling;
    }

    hasForSale() {
        return this.isSelling;
    }

    lookingToBuy() {
        return this.isBuying;
    }

    addItemToProfile(item: SaleItem): boolean {
        let index: number = this.interestedItems.length;
        this.interestedItems[index] = item;
        return true;
        // prevent them from adding things that already exist
    }

    getAllProfileItems() : SaleItem[] {
        return this.interestedItems;
    }


}