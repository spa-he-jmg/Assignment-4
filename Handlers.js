import { hideModal, showModal, resetDisplay, showDebugOption, showDebugModal } from './Display.js';

export function setHandlers(game) {
    const overlay = document.getElementById('overlay');
    const exitHelp = document.getElementById('exit-help');
    const exitStats = document.getElementById('exit-stats');
    const exitDebug = document.getElementById('close-debug-btn');

    const helpBtn = document.getElementById('help-btn');
    const statsBtn = document.getElementById('stats-btn');

    const keyboard = document.getElementById('keyboard');

    const closeModal = (event) => {
        if (event.target === event.currentTarget) {
            hideModal();
        }
    }

    const openModal = (event) => {
        if (event.target === event.currentTarget) {
            let modal = '';

            switch (event.target.id) {
                case 'help-btn':
                    modal = 'help-modal';
                    break;
                case 'stats-btn':
                    modal = 'stats-modal';
                    break;
                default:
                    break;
            }

            showModal(modal);
        }
    }

    overlay.addEventListener('click', closeModal);
    exitHelp.addEventListener('click', closeModal);
    exitStats.addEventListener('click', closeModal);
    exitDebug.addEventListener('click', closeModal);

    helpBtn.addEventListener('click', openModal);
    statsBtn.addEventListener('click', openModal);

    document.getElementById('debug-btn').addEventListener('click', (event) => {
        showDebugModal(game.currentWord); 
    });

    const onScreenKeyboardPress = (event) => {
        if (event.target.classList.contains('keyboard-key')) {
            if (event.target.dataset.key === 'ENTER') {
                game.addGuess();
            }
            else if (event.target.dataset.key === 'DELETE') {
                game.deleteLetter();
            }
            else {
                game.addLetter(event.target.dataset.key);
            }
        }
    };

    const keyboardPress = (event) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            game.addLetter(String.fromCharCode(event.keyCode).toLowerCase());
        }
        else if (event.keyCode === 13) {
            game.addGuess();
        }
        else if (event.keyCode === 8) {
            game.deleteLetter();
        }
    }

    keyboard.addEventListener('click', onScreenKeyboardPress);
    document.addEventListener('keydown', keyboardPress);

    const startRound = (event) => {
        resetDisplay();
        game.setRound();
        hideModal();
    };

    document.getElementById('play-again-btn').addEventListener('click', startRound)
}