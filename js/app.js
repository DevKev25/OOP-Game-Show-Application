/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// let game = null

/*
The following event listener starts the game or resets it once the player is
done with the previous game
*/
const startGameBtn = document.getElementById('btn__reset');
startGameBtn.addEventListener('click', function() {
    resetGame();

    game = new Game();
    game.startGame();

    
});

const keyboardBtn = document.getElementById('qwerty');

/*
The following event listener listens for when the player clicks on a letter.
*/
keyboardBtn.addEventListener('click', (e) => {
    const keyBtn = e.target;

    if(keyBtn.className === 'key') {

        game.handleInteraction(keyBtn);
    }

    
});

function resetGame(game){
    if(game !== null) {
        //Remove all `li` elements from the Phrase `ul` element
        const ul = document.querySelector('ul');
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        //Enable all of the onscreen keyboard buttons and remove classes from it
        const keys = document.getElementsByClassName('key');
        for(let key of keys) {
            key.removeAttribute('disabled');
            key.classList.remove('chosen', 'wrong');
        }
        
        //Reset all of the heart images
        const imgs = document.getElementsByTagName('img');
        for(let img of imgs) {
            img.setAttribute('src', 'images/liveHeart.png');
        }

        //Reset overlay Element class to start
        document.getElementById('overlay').className = 'start';
    }
}


