import React, {useContext, useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../styles/Home.css";

import Search from "../Search";
import FetchHookApi from "../hooks/FetchHookApi";
import FetchHookTMDB from "../hooks/FetchHookTMDB";
import RequestStatus from "../RequestStatus";
import SideNav from "../SideNav";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationCircle, faShoppingCart, faEye} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../App';
import { API_KEY, METHOD, CART_API_URL, TMDB_TOP_RATED_URL, NO_IMAGE, IMAGE_URL, PAGE, NO_RESULTS } from '../constants/Constants.js';

/**
 * Home page component
 * @returns {JSX.Element}
 * @constructor
 */
function Home() {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [{ cartData, isLoadingCart, errorCart }, setFetchObject] = FetchHookApi({}, cartItems);
    const [state, setUrl] = FetchHookTMDB(`${TMDB_TOP_RATED_URL}${API_KEY}`, null);
    const [page, setPage] = useState(1);
    const [feedContent, setFeedContent] = useState([]);
    const [currURL, setCurrURL] = useState('');
    const [noResults, setNoResults] = useState(null);

    const { isLoading, error, data } = state;

    // initialize feed with top rated movies
    useEffect(() => {
        setCurrURL(`${TMDB_TOP_RATED_URL}${API_KEY}`);
    }, []);

    // Update cart items when cartData changes
    useEffect(() => {
        setCartItems(cartData);
    }, [cartData]);

    // Update feed content when data changes
    useEffect(() => {
        if (data && data.results &&data.results.length > 0) {
            setNoResults(null);
            const results = data.results;
            const feedContentIds = feedContent.map(result => result.id);
            const newResults = results.filter(result => !feedContentIds.includes(result.id));
            const newFeedContent = [...feedContent, ...newResults];
            setFeedContent(newFeedContent);
        }
        else if(data) {
            setNoResults(NO_RESULTS);
        }
    }, [data]);

    // fetch the next page of results
    const changePage = () => {
        setPage(page + 1);
        const url = `${currURL}${PAGE}${page + 1}`;
        setUrl(url);
        setCurrURL(url);
    }

    // add movie to cart
    const addToCart = (movie) => {
        const cartItem = {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            price: 3.99,
            pictureUrl: movie.poster_path ? IMAGE_URL + movie.poster_path : NO_IMAGE
        };
        setFetchObject({ method: METHOD.POST, url: CART_API_URL, body: cartItem });
    };

    return (
        <>
            <Search setFeedContent={setFeedContent} setCurrURL={setCurrURL} setPage={setPage} currURL={currURL} setUrl={setUrl} />
            <SideNav setFeedContent={setFeedContent} setCurrURL={setCurrURL} setPage={setPage} currURL={currURL} setUrl={setUrl} />
            {currURL.includes(TMDB_TOP_RATED_URL) &&(
                <div className="headline mt-2">
                    <h1 className="title">Welcome to TMDB</h1>
                    <h2 className="subtitle">
                        Discover the World of Cinema
                    </h2>
                </div>
            )}
            <RequestStatus isLoadingCart={isLoadingCart || isLoading} errorCart={error || noResults} />
            {errorCart &&  (
                <div className="error-container">
                    {errorCart.map((error, index) => (
                        <p key={index} className="error"><FontAwesomeIcon icon={faExclamationCircle} /> {error}</p>
                    ))}
                </div>
            )}
            {feedContent && feedContent.length > 0 && (
                <div className="mx-5 mt-3 row row-cols-1 row-cols-md-5 g-4">
                    {feedContent.map((movie) => (
                        <div key={movie.id} className="col">
                            <div className="card m-2 mb-4">
                                <div className="shape">
                                    <div className="price">3.99<span>$</span></div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                <button className="add-to-cart-button" onClick={() => addToCart(movie)}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{color: "black"}} />
                                    <div className="button-text">Add to Cart</div>
                                </button>
                                </div>
                                <img
                                    src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://joadre.com/wp-content/uploads/2019/02/no-image.jpg'}
                                    className="card-img-top"
                                    alt={movie.title}
                                    style={{ height: "250px", objectFit: "fill" }}
                                />
                                <div className="card-body"
                                     style={{ height: "100px", overflow: "hidden",  background: "black" }}>
                                    <h5 className="card-title" style={{ fontSize: "1rem", color: "white"}}>{movie.title}</h5>
                                </div>
                                <div className="back">
                                    <p><FontAwesomeIcon icon={faEye}></FontAwesomeIcon><b className="mx-2">{movie.title}</b></p>
                                    <p className="card-text"  style={{color: "white", fontSize:"13px"}}>{movie.release_date}</p>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {feedContent.length >= 20 && (
                <div className="text-center m-2 mt-4 mb-2">
                    <button type="button" style={{borderRadius:"40px"}} onClick={changePage} className="btn btn-dark" >Load More</button>
                </div>
            )}
        </>
    );
}

export default Home;
