import blueCardsData from "../../data/mythicCards/blue/index.js";
import brownCardsData from "../../data/mythicCards/brown/index.js";
import greenCardsData from "../../data/mythicCards/green/index.js";
import ancientsData from "../../data/ancients.js";
import {shuffle, chooseCardsByDifficulty} from './cardDeck-helper.js';

export class CardDeck {
    constructor(ancientName, difficulty) {
        let ancientCardInfo = ancientsData[ancientName];
        let cardsAmountForGame = {};
        ['green', 'blue', 'brown'].forEach(color => 
            cardsAmountForGame[color] = ancientCardInfo.stages.reduce((prev, curr) => prev + curr[color], 0));
        
        let green = chooseCardsByDifficulty(greenCardsData, difficulty, cardsAmountForGame.green);
        let blue = chooseCardsByDifficulty(blueCardsData, difficulty, cardsAmountForGame.blue);
        let brown = chooseCardsByDifficulty(brownCardsData, difficulty, cardsAmountForGame.brown);
        
        let cardsByColor = {
            green, 
            blue, 
            brown
        };

        this._state = [];
        this._state.push(...ancientCardInfo.stages);
        this._allCardsForGame = this._state.map(function(stage) {
            let r = [];

            for (let [color, count] of Object.entries(stage)) {
                r.push(...cardsByColor[color].splice(-count, count));
            }

            return shuffle(r);
        }).flat();

        this._next = 0;
        this._stage = 0;
    }

    pop() {
        if (this._next >=  this._allCardsForGame.length) return null;

        let currentCard = this._allCardsForGame[this._next++];

        if (this._state[this._stage][currentCard.color]) {
            this._state[this._stage][currentCard.color]--;
        } else {
            this._stage++;
            this._state[this._stage][currentCard.color]--;
        }

        return currentCard;
    }

    get state() {
        return this._state;
    }

    isGameOver() {
        console.log(55);
        return this._next >= this._allCardsForGame.length;
    }
}
