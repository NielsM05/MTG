
// _unopendBoosters: contains the list of booster packs, opened and/or unopened
// for example: [0, 1, 2, 1, 3, 3] 
// this means: first booster is open and has the version 0 image, second is not open and has the version image, third one is not open and has the version 2 image, ...
// if you have a better/other solution here, you may implement your own!!!

let _unopendBoosters = [];

const _MAX_BOOSTER_VERSIONS = 3;

let cardForPool = [];

let cardInPool = [];
// ## GIVEN ##

function initBoostersPage(){
    loadSets(data.set);
    renderBooster();

}


// ## YOUR ADDED FUNCTIONS ##
function renderBooster(){
    //this function should render the boosterpacks on the page
    const data = getSavedData();
    const $selectedSet = data.set;
    const $amount = data.amount;


    const $unopenedBoosters = document.querySelector("#unopenedBoosters");
    $unopenedBoosters.innerHTML = "";

    const $openedBoosters = document.querySelector("#openedBooster");
    $openedBoosters.innerHTML = "";

    for (let i = 0; i < $amount; i++) {
        const $boosterVersion = getRandomNumber(_MAX_BOOSTER_VERSIONS,1);
        const $boosterImagePath = `images/${$selectedSet}/booster_v${$boosterVersion}.jpg`;

        const $boosterElement = document.createElement("li");
        $boosterElement.classList.add("booster");
        const $boosterImage = document.createElement("img");

        $boosterImage.src = $boosterImagePath;
        $boosterImage.alt = `Booster ${i + 1} from ${config.sets[$selectedSet]}`;
        $boosterImage.title = `Booster ${i + 1}`;
        $boosterImage.dataset.booster = i;
        $boosterImage.dataset.opened = "0";

        $boosterElement.appendChild($boosterImage);
        _unopendBoosters.push($boosterVersion);
        document.querySelector('#unopenedBoosters').appendChild($boosterElement);


    }


    addEventListeners();

}


function addEventListeners(){
    //this function should add event listeners to the booster packs
    const $booster = document.querySelectorAll(".booster");
    for (let i = 0; i < $booster.length; i++){
        $booster[i].addEventListener('click', openBooster);
    }

    let navigateDeck = document.querySelector('.nav[data-target="deck-building"]');
    navigateDeck.addEventListener('click', openUnopenedBoosters);
    navigateDeck.addEventListener('click', navigate);
    navigateDeck.addEventListener('click', initDeckbuildingPage);

}

function openBooster(e){
    //this function should open a booster pack
    const $booster = e.currentTarget;
    const index = Array.from($booster.parentNode.children).indexOf($booster);
    if (_unopendBoosters[index] === 0){
        return;
    }
    _unopendBoosters[index] = 0;
    const $imgsrc = `images/${getSavedData().set}/booster_v0.jpg`;
    $booster.innerHTML = `<img src="${$imgsrc}" alt="Booster ${$booster.dataset.booster} from ${config.sets[getSavedData().set]}" title="Booster ${$booster.dataset.booster}">`;
    const set = getSavedData().set;
    const cards = loadSets(set); // loadSet now returns the cards

    displayCards(cards); // pass the cards to displayCards
}




function displayCards(){
    //this function should display the cards on the page
    const $booster = document.querySelector('#openedBooster');
    $booster.innerHTML = "";
    let boosterCards = getBooster();
    for (let i= 0; i < boosterCards.length; i++){
        if(boosterCards[i] !== undefined) {
            const $card = `<li class="card"><img class="card" src="${boosterCards[i].image}" alt="${boosterCards[i].name}" title="${boosterCards[i].name}" data-id="${boosterCards[i].id}" data-sequence-id="${i}"></li>`;
            $booster.insertAdjacentHTML('beforeend', $card);
        }
    }

    cardForPool.push(boosterCards);
    cardInPool = cardForPool.flat();
}

function openUnopenedBoosters(){
    //this function should open all unopened booster packs
    const $boosters = document.querySelectorAll(".booster");
    for (let i = 0; i < _unopendBoosters.length; i++){
        if (_unopendBoosters[i] !== 0){
            $boosters[i].click();
        }
    }
}