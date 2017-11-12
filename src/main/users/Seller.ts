import { SaleItem } from '../item/SaleItem';
import { User } from './User';

export class Seller extends User {

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