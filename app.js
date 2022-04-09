import { Game } from './Game.js';

async function initVocab() {
    const response = await fetch('https://murmuring-atoll-65515.herokuapp.com/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
    const result = await response.json();
    return result;
}

initVocab().then((vocab) => {
    console.log(vocab);
});