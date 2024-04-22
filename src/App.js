import React, { useState } from 'react';
import './App.css';
import dog from './svg/dog2.svg';
import cat from './svg/cat.svg';
import FactsPopup from './FactsPopup';

function App() {
    // Size of the dog portion of the screen (start at 50)
    const [dogSize, setDogSize] = useState(50);

    // Variables to hold the facts
    const [catFact, setCatFact] = useState('');
    const [dogFact, setDogFact] = useState('');

    // Bools whether or not the facts are showing 
    const [showDogFact, setShowDogFact] = useState(false);
    const [showCatFact, setShowCatFact] = useState(false);

    // Bool whether or not to display the popup
    const [showFactsPopup, setShowFactsPopup] = useState(false);

    // List to hold the 5 most recent facts for dogs and cats
    const [previousDogFacts, setPreviousDogFacts] = useState([]);
    const [previousCatFacts, setPreviousCatFacts] = useState([]);

    // When the dog portion is clicked
    const handleDogClick = () => {
        //Expand dog portion of the screen
        setShowDogFact(false);
        setShowCatFact(false);
        setCatFact('');
        setDogSize(85);

        // Fetch from the api
        fetch('https://dogapi.dog/api/v2/facts')
            .then(response => response.json())
            .then(data => {
                const fact = data.data[0].attributes.body;
                setDogFact(fact);
                setShowDogFact(true);
                // Check if fact needs to be replaced in list
                setPreviousDogFacts(prev => [...(prev.length >= 5 ? prev.slice(1) : prev), fact]);
            })
            .catch(error => console.error('Error fetching dog facts:', error));
    };

    // When the cat portion is clicked
    const handleCatClick = () => {
        //Un-expand dog portion of the screen
        setShowCatFact(false);
        setShowDogFact(false);
        setDogFact('');
        setDogSize(15);

        // Fetch from the api
        fetch('https://catfact.ninja/fact')
            .then(response => response.json())
            .then(data => {
                const fact = data.fact;
                setCatFact(fact);
                setShowCatFact(true);
                // Check if fact needs to be replaced in list
                setPreviousCatFacts(prev => [...(prev.length >= 5 ? prev.slice(1) : prev), fact]);
            })
            .catch(error => console.error('Error fetching cat facts:', error));
    };

    // Toggle the popup when the button is clicked
    const toggleFactsPopup = (animal) => {
        setShowFactsPopup(animal);
    };

    return (
        <>
            <div className="topBar">

                {/* Recent Dog facts button */}
                <button onClick={() => toggleFactsPopup('dog')} className="dogButton">Previous Dog Facts</button>

                <h1>Animal Fact Generator:
                    <span id="subheader">Click a side to generate an Animal Fact</span></h1>

                {/* Recent Cat facts button */}
                <button onClick={() => toggleFactsPopup('cat')} className="catButton">Previous Cat Facts</button>

            </div>

            <div className="container" style={{ position: 'relative' }}>

                {/* Dog portion of the screen */}
                <div className="dogSection" style={{ flex: dogSize }} onClick={handleDogClick}>
                    <img src={dog} alt="Dog" />
                    <h1>Dog Facts</h1>
                    {/* Only show fact when side is expanded */}
                    <p className={`factTextDog ${showDogFact ? 'visible' : ''}`}>{dogFact}</p>
                </div>

                {/* Cat portion of the screen */}
                <div className="catSection" style={{ flex: 100 - dogSize }} onClick={handleCatClick}>
                    <img src={cat} alt="Cat" />
                    <h1>Cat Facts</h1>
                    {/* Only show fact when side is expanded */}
                    <p className={`factTextCat ${showCatFact ? 'visible' : ''}`}>{catFact}</p>
                </div>

            </div>

            {/* Dog popup when true */}
            {showFactsPopup === 'dog' && (
                <FactsPopup
                    title="5 Recent Dog Facts"
                    facts={previousDogFacts}
                    onClose={() => setShowFactsPopup(false)}
                />
            )}

            {/* Cat popup when true */}
            {showFactsPopup === 'cat' && (
                <FactsPopup
                    title="5 Recent Cat Facts"
                    facts={previousCatFacts}
                    onClose={() => setShowFactsPopup(false)}
                />
            )}
            <div className="bottombar">Made by Ashley</div>
        </>
    );
}

export default App;
