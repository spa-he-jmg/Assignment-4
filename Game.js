import { addBoardLetter, deleteBoardLetter, updateGuessResults, updateKeyBoardResults, endGame} from "./Display.js";

export class Game {
    constructor(answerBank, validBank, stats) {
        this.answerBank = answerBank;
        this.validBank = validBank;

        this.stats = stats;

        this.currentWord = false;
        this.currentGuess = [];

        this.guessCount = 0;
    }

    setRound() {
        this.currentWord = this.answerBank[Math.floor(Math.random() * this.answerBank.length)];
        this.currentGuess = [];
        
        this.guessCount = 0;
    }

    addLetter(letter) {
        if (this.currentGuess.length < 5 && this.guessCount < 6) {
            this.currentGuess.push(letter);
            addBoardLetter();
        }
    }

    deleteLetter() {
        if (this.currentGuess.length > 0 && this.guessCount < 6) {
            this.currentGuess.pop();
            deleteBoardLetter();
        }
    }

    addGuess() {

        if (this.currentGuess.length === 5 && this.guessCount < 6) {

            if (!this.validBank.has(this.currentGuess)) {
                console.log('Invalid word');
            }
            else {

                this.guessCount++;

                let guessResults = [];
                let correctCount = 0;

                for (let i = 0; i < 4; i++) {

                    let letterResult = { letter: this.currentGuess[i] };

                    if (this.currentGuess[i] === this.currentWord[i]) {
                        letterResult.hint = 'correct';
                        guessResults.push(letterResult);
                        correctCount++;
                        continue;
                    }

                    if (this.currentWord.includes(this.currentGuess[i])) {
                        letterResult.hint = 'present';
                        guessResults.push();
                        continue;
                    }

                    letterResult.hint = 'absent';
                }

                updateGuessResults(this.guessCount, guessResults);
                updateKeyBoardResults(guessResults);

                if (correctCount === 5) {
                    this.stats.won++;

                    this.stats.guesses[this.guessCount - 1].count++;

                    endGame(true, this.currentWord);
                }
                else if (correctCount < 5 && this.guessCount === 6) {
                    endGame(false, this.currentWord);
                }

                this.stats.played++;

                localStorage.setItem('stats', JSON.stringify(this.stats));
            }
        }
    }
}