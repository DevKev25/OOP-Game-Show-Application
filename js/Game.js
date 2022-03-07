/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

/*
The following method contains all of the phrases for the game
*/

    createPhrases() {
        const phrasesArray = [
            'never give up', 
            'study hard',
            'believe in yourself', 
            'hardest worker in the room', 
            'achieve your goals'
            
        ];

        return phrasesArray;
    }

/*
getRandomPhrase() method creates a random phrase every time the player hits the start 
game button
*/

    getRandomPhrase()  {
        const randomNumber = Math.floor(Math.random() * this.phrases.length);
        const randomPhrase = new Phrase(this.phrases[randomNumber])
        return randomPhrase;
    }

/*
startGame() begins a new game with a random displayed phrase.
*/

   startGame() {
        const startScreen = document.getElementById('overlay');
        startScreen.style.display = 'none';
        const randomPhrase = this.getRandomPhrase();
        randomPhrase.addPhraseToDisplay();
        this.activePhrase = randomPhrase;
   }

   
/*
The method gameOver(), changes the text content of h1 whenever the user loses or 
wins in the game.
*/

    gameOver(gameWon) {
        const startDiv = document.getElementById('overlay');
        startDiv.style.display = 'block';

        const overlayH1 = document.getElementById('game-over-message');
        const overlayDiv = document.getElementById('overlay');

        if (gameWon) {
            overlayH1.textContent = 'Congratulations! You guessed the phrase.';
            overlayH1.classList.replace('start', 'win');
            
        } else {
            overlayH1.textContent = '0 lives left. Try again.';
            overlayH1.classList.replace('start', 'lose');
        }
    }

    /*
    The handleInteraction() method branches the code on whatever the player or user
    presses. It contains the methods: checkForWin(), gameWon(), and removeLife();
    */ 

    handleInteraction(keyBtn) {
        const keys = document.getElementsByClassName('key');
    
        for (let key of keys) {
            if (key.textContent === keyBtn.textContent) {
                key.setAttribute('disabled', 'disabled')
            }
        }
    
        const matchedLetter = this.activePhrase.checkLetter(keyBtn.textContent);
    
        if (matchedLetter) {
            keyBtn.classList.add('chosen');
            this.activePhrase.showMatchedLetter(keyBtn.textContent);
        
            if (this.checkForWin()) {
                this.gameOver(this.checkForWin());
                
            }
        } else {
            keyBtn.classList.add('wrong');
            this.removeLife();
            
        }
    
        
    }

/*
The following method checks for winning move.
*/

   checkForWin() {
        const letters = document.getElementsByClassName('letter')
        const letterArray = [...letters]

        for (let letter of letterArray) {
            if (letter.classList.contains('hide')) {
                
                return false;
            }
        }

        return true;
   }

/*
The following method removes a life every single time that 
the user chooses a wrong word
*/

   removeLife() {
        const heartImg = document.getElementsByTagName('img');
        heartImg[this.missed].setAttribute('src', 'images/lostHeart.png');
        this.missed += 1;

        if (this.missed === 5) {
            this.gameOver();
        }
   }

   

   
}

  