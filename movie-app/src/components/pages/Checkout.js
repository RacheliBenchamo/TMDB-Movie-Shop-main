import React, {useContext, useEffect, useState} from 'react';
import "../../styles/Checkout.css";

import RequestStatus from "../RequestStatus";
import FetchHookApi from "../hooks/FetchHookApi";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import {AppContext} from "../../App";
import { METHOD, CART_API_URL, CLEAR_CART_URL, PURCHASES_API_URL} from '../constants/Constants.js';

/**
 * Checkout page component
 * @returns {JSX.Element}
 * @constructor
 */
function Checkout() {
    const { cartItems, setCartItems} = useContext(AppContext);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [{ cartData, isLoadingCart, errorCart }, setFetchObject] = FetchHookApi({ method: METHOD.GET, url: CART_API_URL, body: null}, cartItems);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        payment: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    });

    // remove spaces from form data
    const trimFormData = () => {
        for(let key in formData) {
            formData[key] = formData[key].trim();
        }
    }

    // Check if cart is empty
    useEffect(() => {
        if(cartData.length === 0 && success) {
            setCartItems([]);
            setPurchaseComplete(true);

            setTimeout(() => {
                window.location.href = '/';
            }, 6000);
        }
        setSuccess(false);
    }, [cartData]);

    // fetch purchases request
    const handleSubmit = (e) => {
        e.preventDefault();
        trimFormData();
        setIsLoading(true);
        axios.post(PURCHASES_API_URL, formData)
            .then(()=> {
                setSuccess(true);
                setFetchObject({ method: METHOD.DELETE, url: CLEAR_CART_URL, body: null});
            })
            .catch(error => {
                if(error.response.status === 404) {
                    setError([error.response.data.error]);
                }
                else if(error.response.status === 500) {
                    setError([error.response.statusText]);
                }
                else
                    setError(error.response.data);
            }).finally(() => {
                setIsLoading(false);
            });

    };

    return (
        <>
            {purchaseComplete ? (
                <div className="purchase-complete">
                    <h1>Purchase Complete!</h1>
                    <p>Redirecting to home page in seconds...</p>
                    <div className="loading-container"></div>
                </div>
            ) : (
                <div className="checkout-container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart mt-5">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <p>You need to add items to the cart first!</p>
                            <Link to="/"><button className="go-shopping-btn mb-4">Go Shopping!</button></Link>
                        </div>
                    ) : (
                        <div className="checkout">
                            {error &&  (
                                <div className="error-container">
                                    {error.map((err, index) => (
                                        <p key={index} className="error"><FontAwesomeIcon icon={faExclamationCircle} /> {err}</p>
                                    ))}
                                </div>
                            )}
                            <RequestStatus isLoadingCart={isLoadingCart || isLoading} errorCart={errorCart} />
                            <div className="checkout-items">
                                <div className="container">
                                    <div className="row checkout-items" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                        {cartItems.map((item, index) => (
                                            <div className="col mb-3 mt-3" key={index}>
                                                <div className="card bg-black text-white" style={{ width: "120px"}}>
                                                    <img className="card-img-top" src={item.pictureUrl} alt={item.title} />
                                                    <div className="card-body">
                                                        <h5 className="card-title" style={{ fontSize: '14px' }}>
                                                            {item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title}
                                                        </h5>
                                                        <p className="card-text">
                                                            {item.price}$ X {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="checkout-total">
                                        <h3><b>Total: {formData.payment}$</b></h3>
                                    </div>
                                </div>
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        placeholder="First Name"
                                        maxLength={20}
                                        minLength={2}
                                        pattern="^\s*[a-zA-Z]+$"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        placeholder="Last Name"
                                        maxLength={20}
                                        minLength={2}
                                        pattern="^\s*[a-zA-Z]+$"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-input"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <button className="form-button mb-2" type="submit">Pay</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Checkout;