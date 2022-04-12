export function hideModal() {

    let overlay = document.getElementById('overlay');
    let helpModal = document.getElementById('help-modal');
    let statsModal = document.getElementById('stats-modal');
    let debugModal = document.getElementById('debug-modal');

    helpModal.classList.remove('dp-flex');
    helpModal.classList.add('dp-none');

    statsModal.classList.remove('dp-flex');
    statsModal.classList.add('dp-none');

    debugModal.classList.remove('dp-flex');
    debugModal.classList.add('dp-none');

    overlay.classList.remove('dp-flex');
    overlay.classList.add('dp-none');
}

export function showModal(modalId) {

    let overlay = document.getElementById('overlay');
    let modal = document.getElementById(modalId);

    modal.classList.remove('dp-none');
    modal.classList.add('dp-flex');

    overlay.classList.remove('dp-none');
    overlay.classList.add('dp-flex');
}

export function showDebugOption() {
    let debugBtn = document.getElementById('debug-btn');

    debugBtn.classList.remove('dp-none');
    debugBtn.classList.add('dp-flex');
}

export function hideDebugOption() {
    let debugBtn = document.getElementById('debug-btn');

    debugBtn.classList.remove('dp-flex');
    debugBtn.classList.add('dp-none');
}

export function showDebugModal(answer) {

    let debugAnswer = document.getElementById('debug-answer');

    debugAnswer.textContent = answer;

    showModal('debug-modal');
}

export function addBoardLetter(letter, row, cell) {

    let currentCell = document.getElementById(`row-${row + 1}-cell-${cell}`);

    currentCell.textContent = letter.toUpperCase();
}

export function deleteBoardLetter(row, cell) {
    let currentCell = document.getElementById(`row-${row + 1}-cell-${cell}`);

    currentCell.textContent = '';
}

export function updateGuessResults(row, guessResults) {
    for (let i = 0; i < 5; i++) {
        let cell = document.getElementById(`row-${row}-cell-${i + 1}`);

        cell.classList.add(guessResults[i].hint);
    }
}

export function updateKeyBoardResults(guessResults) {
    for (let i = 0; i < 5; i++) {
        let key = document.getElementById(`${guessResults[i].letter}-key`);

        if (guessResults[i].hint === 'correct' && !key.classList.contains('correct-key')) {
            key.classList.remove('present-key');
            key.classList.add('correct-key');
        }

        if (guessResults[i].hint === 'present' && !key.classList.contains('correct-key')) {
            key.classList.add('present-key');
        }

        if (guessResults[i].hint === 'absent' && !key.classList.contains('absent-key')) {
            key.classList.add('absent-key');
        }
    }
}

export function showInvalidMessage() {
    let resultModal = document.getElementById('result-modal');

    resultModal.textContent = 'Invalid Word';

    resultModal.classList.remove('dp-none');
    resultModal.classList.add('dp-flex');
}

export function hideResultModal() {
    let resultModal = document.getElementById('result-modal');

    resultModal.classList.remove('dp-flex');
    resultModal.classList.add('dp-none');
}

export function addBoardRow(row) {
    let boardRow = document.createElement('div');

    boardRow.id = `row-${row + 1}`;
    boardRow.classList.add('board-row');

    for (let i = 0; i < 5; i++) {
        let cell = document.createElement('div');

        cell.id = `row-${row + 1}-cell-${i + 1}`;
        cell.classList.add('board-cell');

        boardRow.appendChild(cell);
    }

    document.getElementById('board').appendChild(boardRow);
}

export function updateStats(stats) {
    document.getElementById('played').textContent = stats.played;
    document.getElementById('win-percent').textContent = Math.round((stats.won / stats.played) * 100);

    for (let guess of stats.guesses) {
        if (guess.count) {
            let barHeight = (guess.count / stats.won) * 100;
            document.getElementById(`guess-bar-${guess.num}`).style.height = `${barHeight}%`;
            document.getElementById(`guesses-${guess.num}`).textContent = guess.count;

            if (barHeight < 21) {
                document.getElementById(`guesses-${guess.num}`).classList.add('top-bar-stat');
            }
            else {
                document.getElementById(`guesses-${guess.num}`).classList.remove('top-bar-stat');
            }
        }
    }
}

export function endGame(win, word) {
    document.getElementById('help-btn').classList.add('pntr-evnt-none');
    document.getElementById('stats-btn').classList.add('pntr-evnt-none');

    let resultModal = document.getElementById('result-modal');
    let statsModal = document.getElementById('stats-modal');
    let playAgainBtn =document.getElementById('play-again-btn');

    playAgainBtn.classList.remove('dp-none');
    playAgainBtn.classList.add('dp-block');

    if (win) {
        let winMessages = ['IMPRESSIVE', 'GREAT', 'NICE', 'FANTASTIC', 'TERRIFIC', 'WONDERFUL', 'SUPERB', 'EXCELLENT', 'TREMENDOUS', 'MAGNIFICENT'];

        let winMessage = winMessages[Math.floor(Math.random() * winMessages.length)];

        resultModal.textContent = winMessage;
    }
    else {
        resultModal.textContent = word.toUpperCase();
    }

    resultModal.classList.remove('dp-none');
    resultModal.classList.add('dp-flex');

    document.getElementById('overlay').classList.add('pntr-evnt-none');
    document.getElementById('exit-stats').classList.add('dp-none');

    setTimeout(() => { showModal('stats-modal') }, 3000);
}

export function resetDisplay() {
    let resultModal = document.getElementById('result-modal');
    resultModal.classList.remove('dp-flex');
    resultModal.classList.add('dp-none');

    let playAgainBtn = document.getElementById('play-again-btn');

    playAgainBtn.classList.remove('dp-block');
    playAgainBtn.classList.add('dp-none');

    document.getElementById('board').replaceChildren();

    addBoardRow(0);

    document.getElementsByClassName('keyboard-key');

    let keys = [...document.querySelectorAll('.keyboard-key')];

    for (let key of keys) {
        key.classList.remove('correct-key');
        key.classList.remove('present-key');
        key.classList.remove('absent-key');
    }

    document.getElementById('help-btn').classList.remove('pntr-evnt-none');
    document.getElementById('stats-btn').classList.remove('pntr-evnt-none');

    document.getElementById('overlay').classList.remove('pntr-evnt-none');
    document.getElementById('exit-stats').classList.remove('dp-none');
    showDebugOption();

    hideModal();
}