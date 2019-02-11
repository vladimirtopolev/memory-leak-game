import {Game} from './Game.js';

export class App {
    constructor(){
        this.gameDiv = document.getElementById('game');
        this.show();
    }

    clearDOM(){
        Array.from(this.gameDiv.childNodes).forEach(el => el.remove())
    }

    show(){
        this.clearDOM();

        const startGameButton = document.createElement('button');
        startGameButton.textContent = 'Start Game';
        startGameButton.addEventListener('click', () => this.startGame());
        this.gameDiv.appendChild(startGameButton);
    }

    startGame(){
        const game = new Game(this);
        this.gameDiv.getElementsByTagName('button')[0].remove();
        game.start();
    }
}