import { Products } from "../../data";
import { CheckoutService } from "../../service";
import { Customer, CustomerOffer, Product } from "../../types";



describe('Checkout service standard tests', () => {
    enum CustomerNameIdMap {
        SecondBite = 1,
        AxilCoffeeRoasters = 2,
        MYER = 3,
        Default = 4,
      }

    const customerOffers: CustomerOffer[] = [
        { offerId: 1, productId: 1, customerId: CustomerNameIdMap.SecondBite, actualQuantity: 3, discountQuantity: 2 },
        { offerId: 2, productId: 2, customerId: CustomerNameIdMap.AxilCoffeeRoasters, discountedPrice: 299.99 },
        { offerId: 1, productId: 2, customerId: CustomerNameIdMap.MYER, actualQuantity: 5, discountQuantity: 4 },
        { offerId: 2, productId: 3, customerId: CustomerNameIdMap.MYER, discountedPrice: 389.99 }
    ]
    
    const customers: Customer[] = [{
        customerId: CustomerNameIdMap.SecondBite,
        name: 'SecondBite',
        isPriviliged: true
    }, {
        customerId: CustomerNameIdMap.AxilCoffeeRoasters,
        name: 'Axil Coffee Roasters',
        isPriviliged: true
    }, {
        customerId: CustomerNameIdMap.MYER,
        name: 'MYER',
        isPriviliged: true
    }, {
        customerId: CustomerNameIdMap.Default,
        name: 'Default',
        isPriviliged: false
    }]

    it('should test scrnario 1 for default user', async () => {
        const isDefaultPreviliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Default && c.isPriviliged);
        const co = new CheckoutService(CustomerNameIdMap.Default, !!isDefaultPreviliged, [])
        co.add(Products[0],1)
          .add(Products[1],1)
          .add(Products[2],1);

        const total = co.total()

        expect(total).toBe('987.97')
    })

    it('should test scrnario 2 for SecondBite user', async () => {
        const isSecondBitePreviliged = customers.find(c => c.customerId ===  CustomerNameIdMap.SecondBite && c.isPriviliged );
        const secondBiteOffers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.SecondBite)
        const co = new CheckoutService(CustomerNameIdMap.SecondBite, !!isSecondBitePreviliged, secondBiteOffers)
        co.add(Products[0],3)
          .add(Products[2],1);

        const total = co.total()

        expect(total).toBe('934.97')
    })

    it('should test scrnario 3 for Axil Coffee Roasters user', async () => {
        const isAxilCoffeeRoastersPreviliged = customers.find(c => c.customerId ===  CustomerNameIdMap.AxilCoffeeRoasters && c.isPriviliged);
        const axilOffers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.AxilCoffeeRoasters)
        const co = new CheckoutService(CustomerNameIdMap.AxilCoffeeRoasters, !!isAxilCoffeeRoastersPreviliged, axilOffers)
        co.add(Products[1],3)
          .add(Products[2],1);

        const total = co.total()

        expect(total).toBe('1294.96')
    })
})

describe('Checkout service additional tests', () => {
    enum CustomerNameIdMap {
        Customer1 = 1,
        Customer2 = 2,
        Customer3 = 3
      }

    const customProducts: Product[] = [{
        productId: 1,
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement',
        price: 100
    }, {
        productId: 2,
        name: 'Stand out Ad',
        description: 'Allows advertisers to use a company logo and use a longer presentation text',
        price: 200
    }, {
        productId: 3,
        name: 'Premium Ad',
        description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
        price: 300
    }, {
        productId: 4,
        name: 'Ultimate Ad',
        description: 'Same benefits as Premium Ad, + Customization',
        price: 500
    }]

    const customers: Customer[] = [{
        customerId: CustomerNameIdMap.Customer1,
        name: 'Customer1',
        isPriviliged: true
    }, {
        customerId: CustomerNameIdMap.Customer2,
        name: 'Customer2',
        isPriviliged: true
    }, {
        customerId: CustomerNameIdMap.Customer3,
        name: 'Customer3',
        isPriviliged: true
    }]

    const customerOffers: CustomerOffer[] = [
        { offerId: 1, productId: 1, customerId: CustomerNameIdMap.Customer1, actualQuantity: 5, discountQuantity: 3 },
        { offerId: 2, productId: 1, customerId: CustomerNameIdMap.Customer2, discountedPrice: 150 },
        { offerId: 1, productId: 2, customerId: CustomerNameIdMap.Customer2, actualQuantity: 5, discountQuantity: 4 },
        { offerId: 1, productId: 1, customerId: CustomerNameIdMap.Customer3, actualQuantity: 3, discountQuantity: 2 },
        { offerId: 2, productId: 3, customerId: CustomerNameIdMap.Customer3, discountedPrice: 250 },
        { offerId: 2, productId: 4, customerId: CustomerNameIdMap.Customer3, discountedPrice: 450 }
    ]

    it('should test custom offer 1', async () => {
        const isCustomer1Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer1 && c.isPriviliged);
        const customer1Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer1)
        const co = new CheckoutService(CustomerNameIdMap.Customer1, !!isCustomer1Previliged, customer1Offers)
        co.add(customProducts[0],5);

        const total = co.total()

        expect(total).toBe('300.00')
    })

    it('should test custom offer 2', async () => {
        const isCustomer2Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer2 && c.isPriviliged);
        const customer2Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer2)
        const co = new CheckoutService(CustomerNameIdMap.Customer2, !!isCustomer2Previliged, customer2Offers)
        co.add(customProducts[0],5);

        const total = co.total()

        expect(total).toBe('750.00')
    })

    it('should test custom offer 3', async () => {
        const isCustomer2Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer2 && c.isPriviliged);
        const customer2Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer2)
        const co = new CheckoutService(CustomerNameIdMap.Customer2, !!isCustomer2Previliged, customer2Offers)
        co.add(customProducts[1],5);

        const total = co.total()

        expect(total).toBe('800.00')
    })

    it('should test custom offer 4', async () => {
        const isCustomer3Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer3 && c.isPriviliged);
        const customer3Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer3)
        const co = new CheckoutService(CustomerNameIdMap.Customer3, !!isCustomer3Previliged, customer3Offers)
        co.add(customProducts[0],3);

        const total = co.total()

        expect(total).toBe('200.00')
    })

    it('should test custom offer 5', async () => {
        const isCustomer3Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer3 && c.isPriviliged);
        const customer3Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer3)
        const co = new CheckoutService(CustomerNameIdMap.Customer3, !!isCustomer3Previliged, customer3Offers)
        co.add(customProducts[2],3);

        const total = co.total()

        expect(total).toBe('750.00')
    })

    it('should test custom offer 6', async () => {
        const isCustomer3Previliged = customers.find(c => c.customerId ===  CustomerNameIdMap.Customer3 && c.isPriviliged);
        const customer3Offers = customerOffers.filter(o => o.customerId === CustomerNameIdMap.Customer3)
        const co = new CheckoutService(CustomerNameIdMap.Customer3, !!isCustomer3Previliged, customer3Offers)
        co.add(customProducts[3],3);

        const total = co.total()

        expect(total).toBe('1350.00')
    })
})

export {};