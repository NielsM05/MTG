// ## GIVEN ##
let costForMana = 0;
let symbolOutput = [];
let searchOutput = "";
function initDeckbuildingPage() {
    renderCardPool();
    renderDeckZones();
    document.querySelector('.card-detail').classList.remove('hidden');
    costForMana = getBiggestManaCostFromCardPool().cmc;
    addEventListenerButtons();
    addEventListenerSymbolsCardpool();
    addEventListenerSymbolsDeck();
    getValuesToFilter();
    backgroundChange();
}

function renderCardPool() {
    const sortedcard = defaultSort(getCardPool());
    const $pool = document.querySelector('.card-pool ul');
    $pool.innerHTML = "";
    const cardsSorted = sortCards(sortedcard);
    const length = cardsSorted.length;

    const $search = document.querySelector('input[id="search-pool"]');
    $search.addEventListener('keyup', addEventListenerSearchCardpool);


    for (let i = 0; i < length; i++) {
        const $liCards = `<li class="currentcard"><img src="${cardsSorted[i].image}" alt="${cardsSorted[i].name}" title="${cardsSorted[i].name}" data-id="${cardsSorted[i].id}">`;
        $pool.insertAdjacentHTML('beforeend', $liCards);
    }
    const $totalcards = document.querySelector('.card-pool span');
    $totalcards.innerHTML = '';
    $totalcards.insertAdjacentHTML('beforeend', `: ${length} cards`);

    addEventListenerCardPool();
    addEventListenerCardDetail();

}

function renderDeck() {
    const $cards = getDeck();
    const length = $cards.length;

    const $search = document.querySelector('input[id="search-deck"]');
    $search.addEventListener('keyup', addEventListenerSearchDeck);



    for (let i = 0; i <= costForMana; i++) {
        const $deck = document.querySelector(`li[data-cmc="${i}"] > ul`);
        $deck.innerHTML = `<h4>${counterCardsZone(i)}</h4>`;
        for (let j = 0; j < $cards.length; j++) {
            if ($cards[j].cmc === i) {
                const $liDeck = `<li class="decks"><img src="${$cards[j].image}" alt="${$cards[j].name}" title="${$cards[j].name}" data-id="${$cards[j].id}">`;
                $deck.insertAdjacentHTML('beforeend', $liDeck);
            }
        }
    }
    const $totalcards = document.querySelector('.deck span');
    $totalcards.innerHTML = '';
    $totalcards.insertAdjacentHTML('beforeend', ` ${length} cards`);
    addEventListenerDeck();
    addEventListenerCardDetailDeck();


}

function renderDeckZones() {
    const $zones = document.querySelectorAll('.deck .cards.container.scrollable');

    // Loop over the zones and clear their content
    for (let i = 0; i < $zones.length; i++) {
        $zones[i].innerHTML = '';
    }

    // Loop over the zones and add the li elements
    for (let i = 0; i < $zones.length; i++) {
        const costMana = getBiggestManaCostFromCardPool().cmc;
        for (let j = 0; j <= costMana; j++) {
            $zones[i].insertAdjacentHTML('beforeend', `<li data-cmc="${j}"><h4>${j}</h4><ul></ul></li>`);
        }
    }
}

function showCardDetail(e) {
    const cardId = e.target.dataset.id;
    const card = findCardById(cardId);
    const $cardDetail = document.querySelector('.card-detail');
    $cardDetail.innerHTML = "";

    // Check if a card was found
    if (card) {
        $cardDetail.insertAdjacentHTML('beforeend', `<img src="${card.image}" alt="${card.name}" title="${card.name}">`);
    }

}

function moveCardToDeck(e) {
    e.preventDefault();
    const cardId = e.target.dataset.id;
    const card = getCardFromPool(cardId);

    // Check if the card is a basic land
    if (config.basic_lands.includes(card.name)) {
        // If it's a basic land, just add it to the deck without removing it from the card pool
        _deck.push(card);
    } else {
        // If it's not a basic land, move it from the card pool to the deck
        moveCardFromPoolToDeck(cardId);
    }

    renderDeck();
    renderCardPool();
    const zoneid = card.cmc;
    const counter = counterCardsZone(zoneid);
    const $zone = document.querySelector(`li[data-cmc="${zoneid}"] > ul`);
    const $counterPounter = $zone.querySelector('h4');
    $counterPounter.innerHTML = counter;

}

function moveCardToPool(e) {
    e.preventDefault();
    const cardId = e.target.dataset.id;
    moveCardFromDeckToPool(cardId); // Move the card from the deck to the card pool
    renderDeck();

    // Check if the card was successfully moved from the deck to the card pool
    if (getCardFromPool(cardId)) {
        // Remove card from deck in the DOM
        e.target.parentElement.remove();

        // Render the card pool again
        renderCardPool();
    }
}


// ## YOUR ADDED FUNCTIONS ##

function addEventListenerCardPool(){
    const $cards = document.querySelectorAll('.currentcard');
    for (let i = 0; i < $cards.length; i++) {
        $cards[i].addEventListener('dblclick', moveCardToDeck);
    }
}

function addEventListenerDeck(){
    const $cards = document.querySelectorAll('.decks');
    for (let i = 0; i < $cards.length; i++) {
        $cards[i].addEventListener('dblclick', moveCardToPool);
    }
}

function addEventListenerCardDetail(){
    const $cards = document.querySelectorAll('.currentcard');
    for (let i = 0; i < $cards.length; i++) {
        $cards[i].addEventListener('mouseover', showCardDetail);
    }

}
function addEventListenerCardDetailDeck(){
    const $cards = document.querySelectorAll('.decks');
    for (let i = 0; i < $cards.length; i++) {
        $cards[i].addEventListener('mouseover', showCardDetail);
    }
}

function addEventListenerButtons(){
    let $thanks = document.querySelector('.nav[data-target="thanks"]');
    $thanks.addEventListener('click', navigate);
    $thanks.addEventListener('click', initThankYouPage);

    let $stats = document.querySelector('.nav[data-target="stats"]');
    $stats.addEventListener('click', navigate);
    $stats.addEventListener('click', initStatsPage);

}

function addEventListenerSymbolsCardpool(){
    const $symbols = document.querySelectorAll('.card-pool .container.manas button');

    for (let i = 0; i < $symbols.length; i++) {
        $symbols[i].addEventListener('click', function(e) {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
            } else {
                e.target.classList.add('selected');
            }

            let buttons = Array.from(document.querySelectorAll('.card-pool .container.manas button'));
            let selectedButtons = buttons.filter(button => button.classList.contains('selected'));
            symbolOutput = selectedButtons.map(button => button.dataset.mana);


        });
    }



}
function addEventListenerSymbolsDeck(){
    const $symbol = document.querySelectorAll('.deck .container.manas button');

    for (let i = 0; i < $symbol.length; i++) {
        $symbol[i].addEventListener('click', function(e) {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
            } else {
                e.target.classList.add('selected');
            }

            let buttons = Array.from(document.querySelectorAll('.card-pool .container.manas button'));
            let selectedButtons = buttons.filter(button => button.classList.contains('selected'));
            symbolOutput = selectedButtons.map(button => button.dataset.mana);


        });
    }



}
function addEventListenerSearchCardpool(){
    const $searching = document.querySelector('input[id="search-pool"]').value.toLowerCase();
    const $card = document.querySelectorAll('.card-pool .cards li');

    $card.forEach(card => {
        const $cardName = card.querySelector('img').alt.toLowerCase();
        if ($cardName.includes($searching)) {
            card.classList.remove('hidden');
        }else {
            card.classList.add('hidden');
        }
    });
}

function addEventListenerSearchDeck(){
    const $searching = document.querySelector('input[id="search-deck"]').value.toLowerCase();
    const $card = document.querySelectorAll('.deck .cards li ul li');

    $card.forEach(card => {
        const $cardName = card.querySelector('img').alt.toLowerCase();
        if ($cardName.includes($searching)) {
            card.classList.remove('hidden');
        }else {
            card.classList.add('hidden');
        }
    });
}

function getValuesToFilter(){
    getFilteredCardPool(searchOutput, symbolOutput);
}

