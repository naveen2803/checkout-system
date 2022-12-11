import PriceDrop from "../offers/priceDrop";
import XForThePriceOfY from "../offers/xForThePriceOfY";
import { CartItem, CustomerOffer, Product } from "../types";

class Checkout {
    customerId: number;
    items: Map<number, CartItem>;
    totalPrice: number;
    isPriviligedCustomer: boolean;
    customerOffers: CustomerOffer[] | undefined;

    constructor(customerId: number, isPriviligedCustomer: boolean, customerOffers?: CustomerOffer[]) {
        this.customerId = customerId;
        this.isPriviligedCustomer = isPriviligedCustomer;
        this.customerOffers = customerOffers;
        this.items = new Map();
        this.totalPrice = 0;
    }

    add(product: Product, quantity: number) {
        const existingItem = this.items.get(product.productId)

        if(existingItem) {
            this.items.set(product.productId, {...existingItem, quantity: existingItem.quantity + quantity})
        }
        else {
            this.items.set(product.productId, {product, quantity})
        }
        // for chaining
        return this;
    }

    total() {
        this.items.forEach(item => {
            // Charge regular price for all items if loggedIn customer is not a priviliged customer
            if(!this.isPriviligedCustomer) {
                this.totalPrice = this.totalPrice + item.product.price * item.quantity;
            }
            else {
                const offer = this.customerOffers && this.customerOffers.find(o => o.productId === item.product.productId && o.customerId === this.customerId);

                // Charge full price if there is no offer available for the item
                if(!offer) {
                    this.totalPrice = this.totalPrice + item.quantity * item.product.price;
                }
                else {
                    switch(offer.offerId) {
                        case 1: {
                            const offerXForThePriceOfY = new XForThePriceOfY(item.product.price, item.quantity, offer.actualQuantity, offer.discountQuantity );
                            this.totalPrice = this.totalPrice + offerXForThePriceOfY.calculate()
                            break
                        }

                        case 2: {
                            const offerPriceDrop = new PriceDrop(item.product.price, item.quantity, offer.discountedPrice)
                            this.totalPrice = this.totalPrice + offerPriceDrop.calculate()
                            break
                        }
                    }
                }
            }
        })
        return this.totalPrice;
    }
}

export default Checkout