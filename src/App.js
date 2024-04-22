import React, { useState } from 'react';
import './App.css';
import dog from './dog.svg';
import cat from './cat.svg';

function SplitScreenFacts() {
    const [dogSize, setDogSize] = useState(50);
    const [catFact, setCatFact] = useState('');
    const [dogFact, setDogFact] = useState('');
    const [showDogFact, setShowDogFact] = useState(false);
    const [showCatFact, setShowCatFact] = useState(false);

    const handleDogClick = () => {
        setShowDogFact(false);
        setShowCatFact(false);
        setCatFact('');
        setDogSize(85);
        fetch('https://dogapi.dog/api/v2/facts')
            .then(response => response.json())
            .then(data => {
                setDogFact(data.data[0].attributes.body);
                setShowDogFact(true);
            })
            .catch(error => console.error('Error fetching dog facts:', error));
    };

    const handleCatClick = () => {
        setShowCatFact(false);
        setShowDogFact(false);
        setDogFact('');
        setDogSize(15);
        fetch('https://catfact.ninja/fact')
            .then(response => response.json())
            .then(data => {
                setCatFact(data.fact);
                setShowCatFact(true);
            })
            .catch(error => console.error('Error fetching cat facts:', error));
    };

    return (
        <>
            <div className="topBar">
                <h1>Animal Fact Generator:</h1>
                <span id="subheader">Pick a side to generate an Animal Fact</span>
            </div>
            <div className="container" style={{ position: 'relative' }}>
                <div className="dogSection" style={{ flex: dogSize }} onClick={handleDogClick}>
                    <img src={dog} alt="Dog" />
                    <h1>Dog Facts</h1>
                    <p className={`factTextDog ${showDogFact ? 'visible' : ''}`}>{dogFact}</p>
                </div>
                <div className="catSection" style={{ flex: 100 - dogSize }} onClick={handleCatClick}>
                    <img src={cat} alt="Cat" />
                    <h1>Cat Facts</h1>
                    <p className={`factTextCat ${showCatFact ? 'visible' : ''}`}>{catFact}</p>
                </div>
            </div>
            <div className="bottombar">Made by Ashley</div>
        </>
    );
}

export default SplitScreenFacts;
