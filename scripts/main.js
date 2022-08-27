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
const cardBack = document.querySelector('.card-back__image');
const cardContainer = document.querySelector('.deck-container');
const currentCard = document.querySelector('.current-card')

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

function toggleAncientsCardsDeck() { //в обработчик для кнопки
    antientsCardsContainers.forEach(item => {
        if (item.classList.contains('cthulthu')) item.classList.toggle('cthulthu-js-distribute');
        if (item.classList.contains('iogsothoth')) item.classList.toggle('iogsothoth-js-distribute');
        if (item.classList.contains('shubniggurath')) item.classList.toggle('shubniggurath-js-distribute');
        if (item.classList.contains('azathoth')) item.classList.toggle('azathoth-js-distribute');
    })
}

function changeListenerForButton() { //в обработчик для кнопки
    ancientsCardsContainer.removeEventListener('click', selectAncient);
    submitButton.addEventListener('click', startThirthScreen);
}

function changeSubtitle() { //в обработчик для кнопки
    subtitle.classList.add('js-hide-opacity');
    setTimeout(() => subtitle.textContent = 'Выберите уровень сложности', 500);
    setTimeout(() => subtitle.classList.remove('js-hide-opacity'), 500);
}

function putActiveAncientOnTop() { //в обработчик для кнопки
    antientsCardsContainers.forEach((item) => {
        if (item.classList.contains(`${activeAncient}`)) item.classList.add('card-overlay');
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
    console.log(deck);
}

function showNextCard() {
    currentCard.src = deck._allCardsForGame[0].cardFace;
}

ancientsCardsContainer.addEventListener('click', selectAncient);
document.addEventListener('click', removeselect);
submitButton.addEventListener('click', startSecondScreen);
levelButtons.addEventListener('click', selectLevel);
cardBack.addEventListener('click', showNextCard)

//TODO:
