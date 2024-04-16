import React, {useState} from 'react';
import "./Card.css"

function Card({name, image}){
    const [{angl, xPos, Ypos}] = userState({
        angl: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        Ypos: Math.random() * 40 - 20
    });

    const transform = `translate(${xPos}px, ${Ypos}px) rotate(${angl}deg)`;

    return <img
            className='Card'
            alt={name}
            src={image}
            style={{transform}}/>
}

export default Card;