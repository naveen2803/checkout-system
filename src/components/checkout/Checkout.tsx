import { useState } from "react";
import { Button, Col, Container, Form, FormSelect, Row, Table } from "react-bootstrap";
import { Products, Customers, CustomerOffers } from "../../data";
import { CheckoutService } from "../../service";
import { CartItem } from "../../types";

import './Checkout.css';

const Checkout = () => {
    const [selectedUserId, setSelectedUserId] = useState(1)
    const [itemsInCart, setItemsInCart] = useState<CartItem[]>([])
    const [productInputs, setProductInputs] = useState<CartItem[]>([])
    const [total, setTotal] = useState('')
    const [checkoutDone, setCheckoutDone] = useState(false)
    
    const productNames = new Map();
    Products.forEach(p => productNames.set(p.productId, { name:p.name }))

    const onAddProduct = (elementName: string): void => {
        const productId = elementName.split('-')[1]

        const item = itemsInCart.find(i => `${i.product.productId}` === productId)
        const productInputQty = productInputs.find(i => `${i.product.productId}` === productId)

        // do nothing if input is empty
        if(!productInputQty || productInputQty.quantity === 0) return;

        if(!item) {
            const product = Products.find(p => p.productId === +productId)
            if(product) {
                setItemsInCart([...itemsInCart, {product, quantity: productInputQty.quantity}])
            }
        }
        else {
            setItemsInCart(itemsInCart.map(i => {
                if(`${i.product.productId}` === productId) {
                    i.quantity = i.quantity + productInputQty.quantity
                }
                return i
            }))
        }

        // clear input box after adding the value
        setProductInputs(productInputs.map(p => {
            if(`${p.product.productId}` === productId) {
                p.quantity = 0;
            }
            return p
        }))
    }

    const onRemoveProduct = (elementName: string): void => {
        const productId = elementName.split('-')[1]
        const updatedCart: CartItem[] = []
        itemsInCart.reduce((acc, curr) => {
            if(`${curr.product.productId}` !== productId) acc.push(curr)

            return acc
        }, updatedCart)

        setItemsInCart(updatedCart)
    }

    const displayProductInputs = (elementName: string) => {
        const productId = elementName.split('-')[1]
        const item = productInputs.find(i => `${i.product.productId}` === productId)
        
        if(!item) return ''
        
        return item.quantity === 0 ? '' : item.quantity;
    }

    const onQtyInputChange = (quantity: string, elementName: string) => {
        const productId = elementName.split('-')[1];
        const item = productInputs.find(i => `${i.product.productId}` === productId)

        // restrict quantity input to be numbers only
        if(isNaN(+quantity)) return

        if(!item) {
            const product = Products.find(p => p.productId === +productId)
            if(product) {
                setProductInputs([...productInputs, {product, quantity: +quantity}])
            }
        }
        else {
            setProductInputs(productInputs.map(p => {
                if(`${p.product.productId}` === productId) {
                    p.quantity = +quantity
                }
                return p
            }))
        }
    }

    const onCheckout = () => {
        const priviligedCustomer = Customers.filter(c => c.customerId === selectedUserId && c.isPriviliged)[0];
        const offers = CustomerOffers.filter(o => o.customerId === selectedUserId);

        const co = new CheckoutService(selectedUserId, !!priviligedCustomer, offers)
        itemsInCart.forEach(i => {
            co.add(i.product, i.quantity)
        });

        setTotal(co.total());
        setCheckoutDone(true)
    }

    const onReset = () => {
        setItemsInCart([])
        setProductInputs([])
        setTotal('');
        setCheckoutDone(false)
    }

    return  (
        <div className="flex-container">
            <Container className="col-4 pt-3">
                <Row className="mb-3">
                    <Col>
                        <span className="subHeading">Logged in as: </span>
                        <FormSelect id="customerdd" onChange={(e) => setSelectedUserId(+e.target.value)} disabled={checkoutDone}>
                            <option value="1">SecondBite</option>
                            <option value="2">Axil Coffee Roasters</option>
                            <option value="3">MYER</option>
                            <option value="4">Default</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Row><Col><span className="subHeading">Select Products to add:</span></Col></Row>
                <Row className="mb-3">
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Retail Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Products.map(p => {
                                    return(
                                        <tr key={`product-${p.productId}`}>
                                            <td><span>{p.name}</span></td>
                                            <td width={150}><span>${p.price}</span></td>
                                            <td width={50}>
                                                <Form.Control 
                                                name={`qtyProduct-${p.productId}`} 
                                                disabled={checkoutDone}
                                                type="input" 
                                                value={displayProductInputs(`qtyProduct-${p.productId}`)}
                                                onChange= {e => onQtyInputChange(e.target.value, `qtyProduct-${p.productId}`)}/>
                                            </td>
                                            <td width={50}>
                                                <Button 
                                                variant="primary" 
                                                disabled={checkoutDone}
                                                name={`btnAddProduct-${p.productId}`} 
                                                onClick={(e) => onAddProduct(e.currentTarget.name)}>Add</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                
                <Row><Col><span className="subHeading">Products Added to cart:</span></Col></Row>
                <Row className="mb-3">
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsInCart.map(i => {
                                    return(
                                        <tr key={`itemInCart-${i.product.productId}`}>
                                            <td><span>{productNames.get(i.product.productId).name}</span></td>
                                            <td><span>{i.quantity}</span></td>
                                            <td width={50}>
                                                <Button 
                                                variant="danger" 
                                                disabled={checkoutDone}
                                                name={`btnRemoveProduct-${i.product.productId}`} 
                                                onClick={(e) => onRemoveProduct(e.currentTarget.name)}>Remove</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                {!checkoutDone && (
                    <Col>
                        <Button 
                            variant="success" 
                            onClick={() => onCheckout()}>Checkout</Button>
                    
                    </Col>
                )}
                {checkoutDone && (
                    <Col>
                        <Button 
                            variant="primary" 
                            onClick={() => onReset()}>Reset</Button>
                    
                    </Col>
                )}
                </Row>
            </Container>

            <Container className="col-4 pt-3">
                <Row><Col><span className="subHeading">Summary</span></Col></Row>
                {checkoutDone && itemsInCart.map(i => {
                    return(
                        <Row key={`fragment-${i.product.productId}`}>
                            <Col><span className="summary">{productNames.get(i.product.productId).name}</span></Col>
                            <Col><span className="summary">{i.quantity}</span></Col>
                        </Row>
                    )
                })}
                <Row><Col><span className="subHeading">Total: {total === '' ? '' : `$${total}`}</span></Col></Row>
            </Container>
        </div>
    )
}

export default Checkout