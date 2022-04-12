import { addBoardLetter, deleteBoardLetter, updateGuessResults, updateKeyBoardResults, updateStats, endGame, hideDebugOption, showInvalidMessage, hideResultModal, addBoardRow} from "./Display.js";

export class Game {
    constructor(answerBank, validBank, stats) {
        this.answerBank = answerBank;
        this.validBank = validBank;

        this.stats = stats;

        this.currentWord = this.answerBank[Math.floor(Math.random() * this.answerBank.length)];
        this.currentGuess = [];

        this.guessCount = 0;

        console.log(this.currentWord)
    }

    setRound() {
        this.currentWord = this.answerBank[Math.floor(Math.random() * this.answerBank.length)];
        console.log(this.currentWord);
        this.currentGuess = [];
        
        this.guessCount = 0;
    }

    addLetter(letter) {
        if (this.currentGuess.length < 5 && this.guessCount < 6) {
            this.currentGuess.push(letter);
            addBoardLetter(letter, this.guessCount, this.currentGuess.length);
        }
    }

    deleteLetter() {
        if (this.currentGuess.length > 0 && this.guessCount < 6) {
            this.currentGuess.pop();
            deleteBoardLetter(this.guessCount, this.currentGuess.length + 1);
            hideResultModal();
        }
    }

    addGuess() {

        if (this.currentGuess.length === 5 && this.guessCount < 6) {
            if (!this.validBank.has(this.currentGuess.join(''))) {
                console.log('Invalid word');
                showInvalidMessage();
            }
            else {

                this.guessCount++;

                if (this.guessCount === 1) {
                    hideDebugOption();
                }

                let guessResults = [];
                let correctCount = 0;

                for (let i = 0; i < 5; i++) {

                    let letterResult = { letter: this.currentGuess[i] };

                    if (this.currentGuess[i] === this.currentWord[i]) {
                        letterResult.hint = 'correct';
                        guessResults.push(letterResult);
                        correctCount++;
                        continue;
                    }

                    if (this.currentWord.includes(this.currentGuess[i])) {
                        letterResult.hint = 'present';
                        guessResults.push(letterResult);
                        continue;
                    }

                    letterResult.hint = 'absent';
                    guessResults.push(letterResult);
                }

                updateGuessResults(this.guessCount, guessResults);
                updateKeyBoardResults(guessResults);

                if (correctCount === 5) {
                    this.stats.played++
                    this.stats.won++;

                    this.stats.guesses[this.guessCount - 1].count++;

                    localStorage.setItem('stats', JSON.stringify(this.stats));

                    updateStats(this.stats);
                    endGame(true, this.currentWord);
                }
                else if (correctCount < 5 && this.guessCount === 6) {
                    this.stats.played++;
                    localStorage.setItem('stats', JSON.stringify(this.stats));
                    
                    updateStats(this.stats);
                    endGame(false, this.currentWord);
                }
                else {
                    this.currentGuess = [];
                    addBoardRow(this.guessCount)          
                }
            }
        }
    }
}