// ## GIVEN ##

// important: never use the variable directly in other javascript files!!!!
const _cards = [];

// important: never use the variable directly in other javascript files!!!!
let _rarityList;


// Loads a set of cards into the _cards array
function loadSets(set) {
    // Clear the _cards array before loading new cards
    _cards.length = 0;

    for (let i = 0; i < _allCards[set].length; i++) {
        _cards.push(_allCards[set][i]);
    }

    // Check if the _cards array is empty
    if (_cards.length === 0) {
        console.log("No cards found for the specified set.");
    } else {
        console.log(_cards);
    }

    return _cards;
}


// Retrieves the current list of cards stored in _cards.
function getCards() {
    return _cards;
}

// Searches for a card by its ID in the _cards array. If found, returns the card object; otherwise, returns null.
function findCardById(id) {
    const cards = getCards();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === id) {
            return cards[i];
        }
    }
}


// Generates a booster pack of cards based on a predefined structure from the config object. It selects unique and random cards based on rarity and adds them to the booster pack.
// An array of (unqiue and random) card objects representing a booster pack.
function getBooster() {
    let booster = [];
    let rarity = ["rare", "wildcard", "uncommon", "common"];
    for (let i = 0; i < rarity.length; i++) {
        let cards;
        if (rarity[i] === "wildcard") {
            cards = getBasicLand();
        } else {
            cards = getRandomCards(rarity[i], config.booster.structure[rarity[i]]);
        }
        // Check if cards is not undefined and is an array
        if (cards && Array.isArray(cards)) {
            booster = booster.concat(cards);
        }
    }

    return booster;
}

// Selects a random set of cards based on rarity. It ensures that no duplicates or basic land  are included .
function getRandomCards(rarity, nrOfCards) {
    let sortedCards = getCardListByRarity()[rarity];
    let randomCards = [];
    for (let i = 0; i < nrOfCards; i++) {
        let randomNumber = getRandomNumber(sortedCards.length, 1);
        randomCards.push(sortedCards[randomNumber]);
        sortedCards.splice(randomNumber, 1);
    }
    return randomCards;
}

// Organizes all cards from _cards by their rarity. If this has been done before, it returns the previously created list.
function getCardListByRarity() {
    const allOfTheCards = getCards();
    _rarityList ={
        "rare": [],
        "uncommon": [],
        "common": []
    };
    const basicLands = config.basic_lands;
    for (let i = 0; i < allOfTheCards.length; i++) {
        let card = allOfTheCards[i];
        if (!basicLands.includes(card.name)) {
            _rarityList[card.rarity].push(card);
        }
    }

    return _rarityList;
}

function isBasicLand(card) {
    const basicLands = config.basic_lands;
    // Returns true if the card is a basic land; otherwise, returns false.
    for (let i = 0; i < basicLands.length; i++) {
        if (card.name === basicLands[i]) {
            return true;
        }
    }
    return false;
}

//  Retrieves all basic land cards from _cards.
function getBasicLand() {
    let basicLand = [];
    let basicLands = [];
    let cards = getCards();
    for (let i = 0; i < cards.length; i++) {
        if (isBasicLand(cards[i])) {
            basicLands.push(cards[i]);
        }
    }
    let randomNumber = getRandomNumber(basicLands.length, 1);
    basicLand.push(basicLands[randomNumber]);
    return basicLand;
}


// ## YOUR ADDED FUNCTIONS ##


