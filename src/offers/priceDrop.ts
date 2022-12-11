import AbstractOffer from "./abstractOffer";

class PriceDrop extends AbstractOffer {
    actualPrice: number;
    newPrice: number;
    productQuantity: number;

    constructor(actualPrice: number, productQuantity: number, newPrice?: number) {
        super();

        this.actualPrice = actualPrice;
        this.productQuantity = productQuantity

        // defaults to the product's actual price if discount price is not available
        if(newPrice)
            this.newPrice = newPrice;
        else 
            this.newPrice = actualPrice;   
    }       

    calculate() {
        return this.newPrice * this.productQuantity;
    }
}

export default PriceDrop