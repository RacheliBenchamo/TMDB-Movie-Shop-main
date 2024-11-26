import React from 'react';
import {Link} from "react-router-dom";
import "../../styles/NoPage.css";

/**
 * 404 page component
 * @returns {JSX.Element}
 * @constructor
 */
function NoPage() {
    return (
        <div style={{ height: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: '#b6b5b5' }}>404 Page Not Found</h2>
            <Link to="/"><button className="main-page-btn mt-4 mb-4">Go To The Main Page</button></Link>
        </div>
    );
}

export default NoPage;
