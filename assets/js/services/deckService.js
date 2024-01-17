// important: never use the variable directly in other javascript files!!!!
let _cardPool = [];

// important: never use the variable directly in other javascript files!!!!
let _deck = [];


// Retrieves a sorted list of cards from the card pool, filtered by a search string and types.
function getFilteredCardPool(search, types) {
    let cards = getCardPool();
    return filterCards(cards, search, types)

}

// Retrieves a sorted list of cards from the deck, filtered by a search string and types.
function getFilteredDeck(search, types) {
    let cards = getDeck();
    return filterCards(cards, search, types)

}

// Retrieves the complete deck.
function getDeck() {
    return _deck;
}

// Retrieves the complete CardPool.
function getCardPool() {
    _cardPool = addCardsToCardPool(cardInPool);
    return _cardPool;
}


function defaultSort(cards) {
    cards.sort((a, b) => a.cmc - b.cmc);
    return cards;
}

function addCardsToCardPool(cards) {
    return cards;
}

function getBiggestManaCostFromCardPool() {
    let highest = 0;
    let highestCard = null;
    for (let i =0; i < cardInPool.length; i++){
        if (cardInPool[i].cmc > highest){
            highest = cardInPool[i].cmc;
            highestCard = cardInPool[i];
        }
    }

    return highestCard;
}

function getCardFromPool(cardId) {
    const cards = getCardPool();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === cardId) {
            return cards[i];
        }
    }
}

function getCardFromDeck(cardId) {
    const cards = getDeck();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === cardId) {
            return cards[i];
        }
    }
}

function moveCardFromPoolToDeck(cardId) {
    const card = getCardFromPool(cardId);
    const deckIndex = _deck.findIndex(card => card.id === cardId);
    if (deckIndex === -1) {
        const cardIndex = _cardPool.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
            const [noCard] = _cardPool.splice(cardIndex, 1);
            _deck.push(noCard);
        }
    }

}

function moveCardFromDeckToPool(cardId) {
    const card = getCardFromDeck(cardId);
    const cardIndex = _deck.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
        const [card] = _deck.splice(cardIndex, 1);
        // Only add the card back to the card pool if it's not a basic land
        if (!config.basic_lands.includes(card.name)) {
            _cardPool.push(card);
        }
    }
    const zoneid = card.cmc;
    const count = counterCardsZone(zoneid);
    const $zone = document.querySelector(`li[data-cmc="${zoneid}"] > ul`);
    const $counterPounter = $zone.querySelector('h4');
    $counterPounter.innerHTML = count;
    renderDeck();
    renderCardPool();

}

function getCreatureCount() {
    let creatureCount = 0;
    for (const card of _deck) {
        if (card.card_face.type_line.main.includes('Creature')) {
            creatureCount++;
        }
    }
    return creatureCount;
}

function getLandCount() {
    let landCount = 0;
    for (const card of _deck) {
        if (card.card_face.type_line.main.includes('Basic Land')) {
            landCount++;
        }
    }
    return landCount;
}

function getNoneCreatureNoneLandCount() {
    let noneCreatureNoneLandCount = 0;
    for (const card of _deck) {
        if (!card.card_face.type_line.main.includes('Creature') && !card.card_face.type_line.main.includes('Basic Land')) {
            noneCreatureNoneLandCount++;
        }
    }
    return noneCreatureNoneLandCount;
}

// Counts the occurrence of each mana type in the deck.
function getManasCount() {
    let manaCount = {
        'W': 0,
        'U': 0,
        'B': 0,
        'R': 0,
        'G': 0,
        'A': 0
    };

    for (const card of _deck) {
        let colors = card.colors;
        for (const color of colors) {
            if (manaCount.hasOwnProperty(color)) {
                manaCount[color]++;
            }
        }
    }

    return manaCount;

}

function filterCards(cards, search, types) {
    let filteredCards = [];
    for (const card of cards) {
        if (filterCardsBySearch(card, search) && filterCardsByType(card, types)) {
            filteredCards.push(card);
        }
    }
    return filteredCards;

}

function filterCardsByType(cards, types) {
    for (let type of types) {
        type = type["data-mana"];
        if(cards.colors.length === 0 || cards.colors.includes(type)){
            return true;
        }
    }
    return false;

}

function filterCardsBySearch(cards, search) {
    for (const char of search) {
        if(cards.name.toLowerCase().includes(char.toLowerCase())){
            return true;
        }
    }
    return false;
}


// ## YOUR ADDED FUNCTIONS ##

function orderCards(card){
    if (card.type_line.includes("Land")){
        return 1;
    } else if (card.colors.length === 1 && card.colors.includes('A') || card.colors.length === 0 && card.type_line.includes("Creature")){
        return 2;
    } else if (card.colors.length === 1 && card.colors.includes('B')){
        return 3;
    } else if (card.colors.length === 1 && card.colors.includes('G')){
        return 4;
    } else if (card.colors.length === 1 && card.colors.includes('R')){
        return 5;
    } else if (card.colors.length === 1 && card.colors.includes('U')){
        return 6;
    } else if (card.colors.length === 1 && card.colors.includes('W')){
        return 7;
    } else if (card.colors.length >= 2){
        return 8;
    }

}

function sortCards(cards){
    cards.sort((a, b) => orderCards(a) - orderCards(b));
    return cards;
}

function counterCardsZone(zoneid){
    const zone = document.querySelector(`li[data-cmc="${zoneid}"] > ul`);
    return zone.querySelectorAll('li').length;
}
