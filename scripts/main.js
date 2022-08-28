import {CardDeck} from "./algo/cardDeck.js";

const ancientsCardsContainer = document.querySelector('.ancients-cards__container');
const ancientsSubtitle = document.querySelector('.title__subtitle_ancients');
const ancientsCards = document.querySelectorAll('.ancient-cards__card-image');
const antientsCardsContainers = document.querySelectorAll('.ancient-cards__card');
const submitButton = document.querySelector('.ancient-button');
const subtitle = document.querySelector('.title__subtitle_ancients');
const levelButtons = document.querySelector('.radios-container');
const levelButtonsInputs = document.querySelectorAll('.radio__input');
const counterContainer = document.querySelector('.state-container');
const stageContainer = document.querySelectorAll('.stage-dots-container');
const cardBack = document.querySelector('.card-back__image');
const cardContainer = document.querySelector('.deck-container');
const currentCardImage = document.querySelector('.current-card');
const overlay = document.querySelector('.js-overlay');
const popup = document.querySelector('.popup');
const popupSubmitButton = document.querySelector('.popup__submit');
const counter = function () {
    return [0, 1, 2].map(function (level) {
        let res = {};
        ["green", "brown", "blue"].forEach(color => res[color] = document.querySelector(`.stage-${level} .dot.${color}`));

        return res;
    })
}();

let activeAncient = '';
let activeLevel = '';
let deck;

function showTitle() {
    ancientsSubtitle.classList.remove('js-hide-opacity');
}

setTimeout(showTitle, 500);
setTimeout(toggleAncientsCardsDeck, 500);

function selectAncient(e) {
    if (e.target != e.currentTarget) {
        ancientsCards.forEach(card => card.classList.remove('card-chosen'));
        e.target.classList.add('card-chosen');
        activeAncient = e.target.alt;
        console.log(activeAncient);
        submitButton.disabled = false;
    }
    e.stopPropagation();
}

function removeselect(e) {
    if (!e.target.classList.contains('ancient-cards__card-image')) {
        ancientsCards.forEach(card => card.classList.remove('card-chosen'));
        submitButton.disabled = true;
    }
    if (!e.target.classList.contains('radio__label')) {
        levelButtonsInputs.forEach(input => input.checked = false);
    }
}

function toggleAncientsCardsDeck() {
    antientsCardsContainers.forEach(item => {
        if (item.classList.contains('cthulhu')) item.classList.toggle('cthulthu-js-distribute');
        if (item.classList.contains('iogSothoth')) item.classList.toggle('iogsothoth-js-distribute');
        if (item.classList.contains('shubNiggurath')) item.classList.toggle('shubniggurath-js-distribute');
        if (item.classList.contains('azathoth')) item.classList.toggle('azathoth-js-distribute');
    })
}

function changeListenerForButton() {
    ancientsCardsContainer.removeEventListener('click', selectAncient);
    submitButton.addEventListener('click', startThirthScreen);
}
function changeSubtitle() {
    subtitle.classList.add('js-hide-opacity');
    setTimeout(() => subtitle.textContent = 'Выберите уровень сложности', 500);
    setTimeout(() => subtitle.classList.remove('js-hide-opacity'), 500);
}
function putActiveAncientOnTop() {
    antientsCardsContainers.forEach((item) => {
        if (item.classList.contains(`${activeAncient}`)) {
            console.log('ancient');
            item.classList.add('card-overlay');}
    });
}
function showLevelButtons() {
    setTimeout(() => levelButtons.classList.remove('js-hide-fast'), 1000);
}

function startSecondScreen() {
    changeSubtitle();
    changeListenerForButton();
    toggleAncientsCardsDeck();
    putActiveAncientOnTop();
    showLevelButtons();
    ancientsCards.forEach((image) => image.style.cursor = 'default');
    submitButton.removeEventListener('click', startSecondScreen);
}

function selectLevel(e) {
    if (e.target != e.currentTarget) {
        if (e.target.id) {
            activeLevel = e.target.id;
            submitButton.disabled = false;
        }
    }
    e.stopPropagation();
}

function startThirthScreen() {
    createDeck();
    submitButton.classList.add('js-hide-opacity');
    levelButtons.classList.add('js-hide-opacity');
    counterContainer.classList.remove('js-hide-opacity');
    subtitle.classList.add('js-hide-opacity');
    cardContainer.classList.remove('js-hide-opacity');
}
function createDeck() {
    deck = new CardDeck(activeAncient, activeLevel);
    renewCounter(deck._state);
}

function showNextCard() {
    let currentCard = deck.pop();

    renewCounter(deck._state);
    checkStage(deck._stage);

    try {
        currentCardImage.src = currentCard.cardFace;
    } catch {
        showPopup();
    }

    currentCardImage.style.boxShadow = '5px 4px 11px -3px #000000';
}

function renewCounter(currentState) {
    currentState.forEach((levelCounters, i) =>
        Object.keys(levelCounters).forEach(color => counter[i][color].textContent = currentState[i][color]));

}

function checkStage(currentStage) {
    if (currentStage > 0) {
        let stageDots = Array.from(stageContainer[`${currentStage - 1}`].children);
        Array.prototype.map.call(stageDots, dot => dot.classList.add('js-dot-bw'));
     }
}


function showPopup() {
    ancientsCards.forEach(image => image.classList.add('js-hide-opacity'));
    counterContainer.classList.add('js-hide-opacity');
    cardBack.classList.add('js-hide-opacity');
    currentCardImage.classList.add('js-hide-opacity');
    overlay.classList.remove('js-hide');
    popup.classList.add('js-show-popup');
}

ancientsCardsContainer.addEventListener('click', selectAncient);
document.addEventListener('click', removeselect);
submitButton.addEventListener('click', startSecondScreen);
levelButtons.addEventListener('click', selectLevel);
cardBack.addEventListener('click', showNextCard);
popupSubmitButton.addEventListener('click', () => location.reload());

//FIX:
// При всех нулях в счетчике затемнять счетчик и убирать колоду с рубашками