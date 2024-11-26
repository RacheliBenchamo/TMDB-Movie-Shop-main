import React, {useContext, useEffect} from 'react';
import "../../styles/Cart.css";

import RequestStatus from '../RequestStatus';
import FetchHookApi from "../hooks/FetchHookApi";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationCircle, faSadTear, faTrashAlt, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from "../../App";
import {Link} from "react-router-dom";
import { METHOD, CART_API_URL, CLEAR_CART_URL} from '../constants/Constants.js';

const DELETE_CART_ITEM_URL = (id) => `${CART_API_URL}/delete/${id}`;
const DECREASE_CART_ITEM_URL = (id) => `${CART_API_URL}/decrease/${id}`;
const INCREASE_CART_ITEM_URL = (id) => `${CART_API_URL}/increase/${id}`;

/**
 * Cart page component
 * @returns {JSX.Element}
 * @constructor
 */
function Cart() {
    const { cartItems, setCartItems} = useContext(AppContext);
    const [{ cartData, isLoadingCart, errorCart }, setFetchObject] = FetchHookApi({ method: METHOD.GET, url: CART_API_URL, body: null}, cartItems);

    // Update cart items when cartData changes
    useEffect(() => {
        setCartItems(cartData);
    }, [cartData]);

    const removeFromCart = (id) => {
        setFetchObject({ method: METHOD.DELETE, url: DELETE_CART_ITEM_URL(id), body: null});
    };

    const clearCart = () => {
        setFetchObject({ method: METHOD.DELETE, url: CLEAR_CART_URL, body: null});
    };

    function removeOne(id) {
        setFetchObject({ method: METHOD.DELETE, url:  DECREASE_CART_ITEM_URL(id), body: null});
    }

    function addOne(id) {
        setFetchObject({ method: METHOD.POST, url:  INCREASE_CART_ITEM_URL(id), body: null});
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <FontAwesomeIcon icon={faSadTear } />
                    <p>Your cart is empty.</p>
                    <Link to="/"><button className="go-shopping-btn">Go Shopping!</button></Link>
                </div>
            ) : (

                <div className="cart-container my-5">
                    <RequestStatus isLoadingCart={isLoadingCart} errorCart={errorCart} />
                    {cartItems.map(item => (
                        <div className="card card-cart" key={item.id}>
                            <div className="card-row">
                                <div className="image-col">
                                    <img src={item.pictureUrl} alt={item.title} />
                                </div>
                                <div className="details-col">
                                    <div className="card-details">
                                        <div className="left-col mt-4">
                                            <p className="movie-name">{item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}</p>
                                            <p>{item.releaseDate}</p>
                                            <p style={{fontSize: "20px", letterSpacing: "4px"}}>Price: {item.price}$</p>
                                            <button className="button-cart mt-2" onClick={() => removeFromCart(item.id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Remove</button>
                                        </div>
                                        <div className="right-col">
                                            <div className="quantity-control">
                                                <button className="quantity-btn mx-1" onClick={() => removeOne(item.id)}><b>-</b></button>
                                                <span className="quantity mx-1">{item.quantity}</span>
                                                <button className="quantity-btn" onClick={() => addOne(item.id)}><b>+</b></button>
                                            </div>
                                            <div className="total-price mt-2">
                                                <h3><b>Total: {(item.price * item.quantity).toFixed(2)}$</b></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="total">
                                    <h3>Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                                <button className="button-clear mx-4 my-2" onClick={clearCart}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Clear Cart</button>
                                <Link to={"/checkout"}><button className="button-checkout mx-4"><FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Checkout</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
