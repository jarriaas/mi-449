import React from 'react';
import './FactsPopup.css';

// Popup for the most recent facts
const FactsPopup = ({ title, facts, onClose }) => {
    return (
        <div className="popupBackdrop">
            <div className="popupContent">
                <div className="popupHeader">
                    <button className="closeButton" onClick={onClose}>X</button>
                    <h2>{title}</h2>
                </div>
                <ul>
                    {/* Map the results to list items */}
                    {facts.map((fact, index) => <li key={index}>{fact}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default FactsPopup;
