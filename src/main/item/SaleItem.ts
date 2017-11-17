export class SaleItem {

    name : string;
    quantity : number;

    constructor(name: string) {
        this.name = name;
        this.quantity = 0;
    }

    setQuantity(quantity : number) : void {
        this.quantity = quantity;
    }


}