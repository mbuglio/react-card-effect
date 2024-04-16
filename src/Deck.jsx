import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';
import { render } from 'react-dom';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

function Deck(){
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI() {
        async function fecthDeck(){
            const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
            setDeck(d.data);
        }
        fecthDeck();
    }, []);


    async function draw(){
        try{
            const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
            if(drawRes.data.remaining === 0) throw new Error('No cards remaining!');

            const card = drawRes.data.cards[0];

            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit + ' ' + card.value,
                    image: card.image
                }
            ]);
        }catch(err){
            alert(err);
        }
    }

    async function startShuffling(){
        setIsShuffling(true);
        try{
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        }catch(err){
            alert(err);
        }finally{
            setIsShuffling(false);
        }
    }


    function renderDrawBrnIfOk(){
        if(!deck) return null;

        return (
            <button className='Deck-gimme' onClick={draw} disabled={isShuffling}>
                Draw Card!
            </button>
        );
    }


    function renderShuffleBtnIfOk(){
        if(!deck) return null;

        return (
            <button className='Deck-gimme' onClick={startShuffling} disabled={isShuffling}>
                Shuffle Deck
            </button>
        );
    }

    return(
        <main className='Deck'>
            {renderDrawBrnIfOk()}
            {renderShuffleBtnIfOk()}
            <div className='Deck-cardarea'>
                {drawn.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </main>
    );
}

export default Deck;