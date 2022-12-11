export type Product = {
    productId: number,
    name: string,
    description: string,
    price: number
}

export type Offer = {
    offerId: number,
    name: string,
}

export type CustomerOffer = {
    offerId: number,
    productId: number,
    customerId: number,
    actualQuantity?: number,
    discountQuantity?: number,
    discountedPrice?: number
}

export type Customer = {
    customerId: number,
    name: string,
    isPriviliged: boolean
}

export type CartItem = {
    product: Product,
    quantity: number
}