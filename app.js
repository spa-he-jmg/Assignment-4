import { Game } from './Game.js';
import { showModal, updateStats } from './Display.js';
import { setHandlers } from './Handlers.js';

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

initVocab().then((result) => {

    const joinedBanks = [result.selectBank, result.validBank];

    const answerBank = result.selectBank;

    const validBank = new Set([].concat(...joinedBanks));

    let stats = JSON.parse(localStorage.getItem('stats'));

    if (stats === null) {
        showModal('help-modal');

        stats = {
            won: 0,
            played: 0,
            guesses: [
                {
                    num: 1,
                    count: 0
                },
                {
                    num: 2,
                    count: 0
                },
                {
                    num: 3,
                    count: 0
                },
                {
                    num: 4,
                    count: 0
                },
                {
                    num: 5,
                    count: 0
                },
                {
                    num: 6,
                    count: 0
                }
            ]
        };
    }

    updateStats(stats);

    let game = new Game(answerBank, validBank, stats);

    setHandlers(game);
});