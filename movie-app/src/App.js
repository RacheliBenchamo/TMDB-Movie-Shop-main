import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import NoPage from "./components/pages/NoPage";
import MenuBar from "./components/MenuBar";

/**
 * App context
 * @type {React.Context<unknown>}
 */
export const AppContext = React.createContext();

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ cartItems, setCartItems }}>
                <Routes>
                    <Route path="/" element={<MenuBar />}>
                        <Route path="/home" element={<Home />} />
                        <Route index element={<Navigate to="/home" />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
};

export default App;
