import React, { useState, useRef, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../styles/SideNav.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faThumbsUp, faVideo, faStream, faLaughSquint, faFilm, faSkullCrossbones,} from '@fortawesome/free-solid-svg-icons';
import { TMDB_DISCOVER_URL, API_KEY, NO_ADULT, POPULAR_MOVIES_URL, ANIMATION_MOVIES_URL, COMEDY_MOVIES_URL, CRIME_MOVIES_URL, UPCOMING_MOVIES_URL, KEY, GENRE } from './constants/Constants.js';

/**
 * Side navigation component
 * @param setFeedContent
 * @param setCurrURL
 * @param setPage
 * @param currURL
 * @param setUrl
 * @returns {JSX.Element}
 * @constructor
 */
function SideNav({ setFeedContent, setCurrURL, setPage, currURL, setUrl }){
    const [currentDate, setCurrentDate] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const buttonRef = useRef(null);
    const sidebarRef = useRef(null);

    // Set current date for upcoming movies at first render
    useEffect(() => {
        setCurrentDate(new Date().toISOString().split('T')[0]);
    }, []);

    // Fetch a new Discover url when active button changes
    useEffect(() => {
        if(activeButton === null || activeButton === GENRE)
            return;

        const url = `${TMDB_DISCOVER_URL}${activeButton}${KEY}${API_KEY}${NO_ADULT}`;
        if(url !== currURL){
            setUrl(url);
            setCurrURL(url);
            setPage(1);
            setFeedContent([]);
        }
    }, [activeButton]);

    function toggleSidebar() {
        setIsSidebarVisible(!isSidebarVisible);
    }

    function handleButtonClick(buttonName) {
        setActiveButton(buttonName);
    }

    // Close sidebar when user clicks outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsSidebarVisible(false);
                setActiveButton(null);
            }
        }
        document.addEventListener('mouseover', handleClickOutside);
        return () => {
            document.removeEventListener('mouseover', handleClickOutside);
        };
    }, [sidebarRef, buttonRef]);

    return (
        <>
            <button ref={buttonRef} onClick={toggleSidebar} className="btn btn-link position-fixed" style={{ left: '0', top: '50%', transform: 'translateY(-50%)', fontSize: '32px' }}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
            {isSidebarVisible &&
                <div ref={sidebarRef} className="sidebar">
                    <button className={`btn btn-link ${activeButton === POPULAR_MOVIES_URL ? 'active' : ''}`} onClick={() => handleButtonClick(POPULAR_MOVIES_URL)}>
                        <FontAwesomeIcon icon={faThumbsUp} />   MOST POPULAR
                    </button>
                    <button className={`btn btn-link ${activeButton === UPCOMING_MOVIES_URL+currentDate? 'active' : ''}`} onClick={() => handleButtonClick(UPCOMING_MOVIES_URL+currentDate)}>
                        <FontAwesomeIcon icon={faVideo} />   UPCOMING MOVIES
                    </button>
                    <button className={`btn btn-link ${activeButton === 'genre' ? 'active' : ''}`} onClick={() => handleButtonClick('genre')}>
                        <FontAwesomeIcon icon={faStream} />   GENRE
                    </button>
                    {activeButton === 'genre' &&
                        <div>
                            <button className={`btn btn-link mx-4 ${activeButton === ANIMATION_MOVIES_URL ? 'active' : ''}`} onClick={() => handleButtonClick(ANIMATION_MOVIES_URL)}>
                                <FontAwesomeIcon icon={faFilm} />   ANIMATION
                            </button>
                            <button className={`btn btn-link mx-4 ${activeButton === COMEDY_MOVIES_URL ? 'active' : ''}`} onClick={() => handleButtonClick(COMEDY_MOVIES_URL)}>
                                <FontAwesomeIcon icon={faLaughSquint} />   COMEDY
                            </button>
                            <button className={`btn btn-link mx-4 ${activeButton === CRIME_MOVIES_URL ? 'active' : ''}`} onClick={() => handleButtonClick(CRIME_MOVIES_URL)}>
                                <FontAwesomeIcon icon={faSkullCrossbones} />   CRIME
                            </button>
                        </div>
                    }
                </div>
            }
        </>
    );
}

export default SideNav;
