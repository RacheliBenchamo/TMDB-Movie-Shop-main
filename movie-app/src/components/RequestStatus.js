import React from 'react';

import "../styles/RequestStatus.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function RequestStatus({ isLoadingCart, errorCart }) {
    return (
        <>
            {isLoadingCart && <div className="loading-container"></div>}
            {errorCart && (
                <div className="error-container">
                    <p className="error">
                        <FontAwesomeIcon icon={faExclamationCircle} /> {errorCart}
                    </p>
                </div>
            )}
        </>
    );
}

export default RequestStatus;
