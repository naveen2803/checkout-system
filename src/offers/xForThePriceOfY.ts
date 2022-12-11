import AbstractOffer from "./abstractOffer";

class XForThePriceOfY extends AbstractOffer {
    actualQuantity: number;
    discountQuantity: number;
    itemPrice: number;
    productQuantity: number;

    constructor(itemPrice: number, productQuantity: number, actualQuantity?: number, discountQuantity?: number) {
        super();

        // defaults to actual price if either actualQuantity or discountQuantity is not available
        if(actualQuantity && discountQuantity) {
            this.actualQuantity = actualQuantity;
            this.discountQuantity = discountQuantity;
        }
        else {
            this.actualQuantity = this.discountQuantity = 1;
        }

        this.itemPrice = itemPrice;
        this.productQuantity = productQuantity;
    }

    calculate(): number{
        return ((this.discountQuantity * this.itemPrice) * Math.floor(this.productQuantity / this.actualQuantity)) + (this.itemPrice * (this.productQuantity % this.actualQuantity))
    }
}

export default XForThePriceOfY