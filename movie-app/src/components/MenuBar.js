import { Outlet, Link } from "react-router-dom";
import React, { useContext } from "react";

import "../styles/MenuBar.css";

import { AppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

/**
 * Menu bar component
 * @returns {JSX.Element}
 * @constructor
 */
const MenuBar = () => {
    const { cartItems, setCartItems } = useContext(AppContext);

    return (
        <>
            <nav className="menu-bar mb-4">
                <ul>
                    <div className="logo">
                        <span>T</span>
                        <span>TMDB</span>
                    </div>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/checkout">CHECKOUT</Link>
                    </li>
                    <li className="cart-button">
                        <Link to="/cart">
                            <span className="cart-icon"><FontAwesomeIcon icon={faCartShopping} /></span>
                        </Link>
                        <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default MenuBar;
