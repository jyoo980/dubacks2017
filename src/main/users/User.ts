import { SaleItem } from '../item/SaleItem';

export abstract class User {

    protected psid : string;
    protected name: string;
    protected isSelling: boolean;
    protected isBuying: boolean;
    protected interestedItems: SaleItem[];
    protected lat : number;
    protected lon : number;

    /**
     *
     * @param {string} name:        name of the user
     * @param {boolean} isSelling:  true if this user is selling, else false
     * @param {boolean} isBuying:   true if this user is buying, else false
     */
    constructor(name: string, psid: string) {
        this.name = name;
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

    setLocation(lat : number, lon : number) {
        this.lat = lat;
        this.lon = lon;
    }

    getLocation() : string {
        return this.lat.toString() + this.lon.toString();
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