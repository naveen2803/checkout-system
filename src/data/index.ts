import { Customer, CustomerOffer, Offer, Product } from "../types"

export const Products: Product[] = [{
    productId: 1,
    name: 'Classic Ad',
    description: 'Offers the most basic level of advertisement',
    price: 269.99
}, {
    productId: 2,
    name: 'Stand out Ad',
    description: 'Allows advertisers to use a company logo and use a longer presentation text',
    price: 322.99
}, {
    productId: 3,
    name: 'Premium Ad',
    description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
    price: 394.99
}]

export const Offers: Offer[] = [{
    offerId: 1,
    name: '{X} for the price of {Y}'
}, {
    offerId: 2,
    name: 'Price drop to {X}'
}]

export const CustomerOffers: CustomerOffer[] = [
    { offerId: 1, productId: 1, customerId: 1, actualQuantity: 3, discountQuantity: 2 },
    { offerId: 2, productId: 2, customerId: 2, discountedPrice: 299.99 },
    { offerId: 1, productId: 2, customerId: 3, actualQuantity: 5, discountQuantity: 4 },
    { offerId: 2, productId: 3, customerId: 3, discountedPrice: 389.99 }
]

export const Customers:Customer[] = [{
    customerId: 1,
    name: 'SecondBite',
    isPriviliged: true
}, {
    customerId: 2,
    name: 'Axil Coffee Roasters',
    isPriviliged: true
}, {
    customerId: 3,
    name: 'MYER',
    isPriviliged: true
}, {
    customerId: 4,
    name: 'Default',
    isPriviliged: false
}]