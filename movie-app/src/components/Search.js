import React, {useState} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../styles/Search.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHistory, faTrash} from '@fortawesome/free-solid-svg-icons';
import { TMDB_SEARCH_URL, API_KEY, NO_ADULT, QUERY } from './constants/Constants.js';

/**
 * Search component
 * @param setFeedContent
 * @param setCurrURL
 * @param setPage
 * @param currURL
 * @param setUrl
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({ setFeedContent, setCurrURL, setPage, currURL, setUrl}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // Handle search if search term is not empty
    const handleSearch = (event) => {
        event.preventDefault();
        if(searchTerm === '') return;
            doSearch(searchTerm);
    };

    // Handle search of item from history
    const handleHistoryClick = (event) => {
        const searchItem = event.target.innerText;
        doSearch(searchItem);
    }

    // If user insert new search term then search for it using hook
    const doSearch = (searchItem) => {
        const url = `${TMDB_SEARCH_URL+API_KEY}${QUERY}${searchItem}${NO_ADULT}`;
        if(url !== currURL) {
            setFeedContent([]);
            setUrl(url);
            setPage(1);
            setCurrURL(url);
        }
        setSearchTerm('');

        updateSearchHistory(searchItem);
        setShowHistory(false);
    }

    const updateSearchHistory = (searchItem) => {
        //Only add if not already in history else move to top
        if(searchHistory.includes(searchItem)){
            setSearchHistory((prevHistory) => [searchItem, ...prevHistory.filter(item => item !== searchItem)]);

        }else{
            setSearchHistory((prevHistory) => [searchItem, ...prevHistory]);
        }
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
    };

    return (
        <div>
            <div className="justify-content-center">
                <form onSubmit={handleSearch}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mt-4 mb-3">
                                <div className="input-group rounded-pill w-100">
                                    <input type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange} onClick={() => setShowHistory(!showHistory)} className="form-control rounded-pill" />
                                    <button type="submit" className="btn btn-primary rounded-pill">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showHistory && searchHistory.length > 0 && (
                        <div className="container search-history-container">
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <div className="input-group rounded-pill w-100">
                                        <ul className="list-group w-100">
                                            {searchHistory.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                    onClick={() => handleHistoryClick({ target: { innerText: item } })}
                                                    style={{ fontSize: '18px' }}
                                                >
                                                    <div className="mx-4"><FontAwesomeIcon icon={faHistory} style={{ color: '#a19b9b' }}/></div>
                                                    {item}
                                                    <button
                                                        type="button"
                                                        className="btn btn-link close-button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSearchHistory((prevHistory) =>
                                                                prevHistory.filter((item) => item !== searchHistory[index])
                                                            );
                                                        }}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                            <button className="list-group-item align-items-center"  onClick={clearSearchHistory}>
                                                <div className="text-center" >
                                                    <div className="mx-4"><FontAwesomeIcon icon={faTrash} style={{ color: '#a19b9b' }}/></div>
                                                    <div className="mx-4" style={{ fontSize: '14px' }}>Clear Search History</div>
                                                </div>
                                            </button>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Search;
