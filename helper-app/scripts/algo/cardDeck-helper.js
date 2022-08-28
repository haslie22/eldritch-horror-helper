function getRandomNum(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getRandomNfrom(array, count) {
    let indexes = new Set();
    let res = [];

    while (indexes.size < count) {
        indexes.add(getRandomNum(0, array.length - 1));
    }

    for (let i of indexes) {
        res.push(array[i]);
    }

    return res;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];

        return array;
    }
}

function chooseCardsByDifficulty(cardsData, difficulty, amount) {
    switch (difficulty) {
        case 'super-easy': {
            let easy = cardsData.filter(card => card.difficulty === 'easy');
            let rest = [];
            if (easy.length < amount) {
                let normal = cardsData.filter(card => card.difficulty === 'normal');
                rest = getRandomNfrom(normal, amount - easy.length);
            }
            
            return shuffle(easy.concat(rest));
        }
        
        case 'easy': {
            let withoutHard = cardsData.filter(card => card.difficulty !== 'hard');

            return getRandomNfrom(withoutHard, amount);
        }

        case 'normal': {
            return getRandomNfrom(cardsData, amount);
        }

        case 'hard': {
            let withoutEasy = cardsData.filter(card => card.difficulty !== 'easy');

            return getRandomNfrom(withoutEasy, amount);
        }

        case 'super-hard': {
            let hard = cardsData.filter(card => card.difficulty === 'hard');
            let rest = [];
            
            if (hard.length < amount) {
                let normal = cardsData.filter(card => card.difficulty === 'normal');
                rest = getRandomNfrom(normal, amount - hard.length);
            }
            
            return shuffle(hard.concat(rest));
        }
    }
}

export {getRandomNum, getRandomNfrom, shuffle, chooseCardsByDifficulty};