import {CardDeck} from "./algo/cardDeck.js";

let myDeck = new CardDeck('azathoth', 'normal');

const ancientsCardsContainer = document.querySelector('.ancients-cards__container');
const ancientsSubtitle = document.querySelector('.title__subtitle_ancients');
const ancientsCards = document.querySelectorAll('.ancient-cards__card-image');
const antientsCardsContainers = document.querySelectorAll('.ancient-cards__card');
const ancientChoiceButton = document.querySelector('.ancient-button');

function showTitle() {
    ancientsSubtitle.classList.remove('js-hide-opacity');
}

setTimeout(showTitle, 500);

function selectAncient(e) {
    if (e.target != e.currentTarget) {
        ancientsCards.forEach(card => card.classList.remove('card-chosen'));
        e.target.classList.add('card-chosen');
        ancientChoiceButton.disabled = false;
    }
    e.stopPropagation();
}

function removeselect(e) {
    if (!e.target.classList.contains('ancient-cards__card-image')) {
        ancientsCards.forEach(card => card.classList.remove('card-chosen'));
        ancientChoiceButton.disabled = true;
    }
}

function wrapAncientsCards() {
    antientsCardsContainers.forEach(item => {
        if (item.classList.contains('cthulthu')) item.classList.add('cthulthu-js-wrap');
        else if (item.classList.contains('iogsothoth')) item.classList.add('iogsothoth-js-wrap');
        else if (item.classList.contains('shubniggurath')) item.classList.add('shubniggurath-js-wrap');
    })
}

function addLevelButtons() {

}

ancientsCardsContainer.addEventListener('click', selectAncient);
document.addEventListener('click', removeselect);
ancientChoiceButton.addEventListener('click', wrapAncientsCards);

//TODO:
//сделать кнопку более заметной
//организовать хранение активной карты
//изменить размер контейнера для карт в функции
//убрать возможность выбора карты Древнего после ее конечного выбора
//положить выбранную карту наверх
