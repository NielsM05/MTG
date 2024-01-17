// ## GIVEN ##

function initStatsPage(){
    const creatureCount = getCreatureCount();
    const noneCreatureNoneLandCount = getNoneCreatureNoneLandCount();
    const landCount = getLandCount();
    const totalCards = getDeck().length;

    // Display the counts in the UI on the left side
    document.querySelector('#type-stats li:nth-child(1) p span:nth-child(2)').textContent = `${creatureCount}`;
    document.querySelector('#type-stats li:nth-child(2) p span:nth-child(2)').textContent = `${noneCreatureNoneLandCount}`;
    document.querySelector('#type-stats li:nth-child(3) p span:nth-child(2)').textContent = `${landCount}`;
    document.querySelector('#type-stats li:nth-child(4) p span:nth-child(2)').textContent = `${totalCards}`;

    //navigate back to the deck page
    let navigateDeck = document.querySelector('.container a[data-target="deck-building"]');
    navigateDeck.addEventListener('click', navigate);

    //call the manaCount function
    setManaCount();

    backgroundChange();
}


// ## YOUR ADDED FUNCTIONS ##
function setManaCount(){
    const mana = getManasCount();
    const manaTypes = Object.keys(mana);

    // Calculate total count of all mana types
    let totalCount = 0;
    for (let i = 0; i < manaTypes.length; i++){
        totalCount += mana[manaTypes[i]];
    }

    // Calculate percentage for each mana type and update the UI
    for (let i = 0; i < manaTypes.length; i++){
        let span = document.querySelector(`#${manaTypes[i]}`);
        let spanP = document.querySelector(`#${manaTypes[i]}-P`);
        if (span) {
            let percentage = (mana[manaTypes[i]] / totalCount) * 100;
            if (isNaN(percentage)) {
                percentage = 0;
            }
            span.textContent = `${mana[manaTypes[i]]} `;
            spanP.textContent = `${percentage.toFixed(0)}%`;
        }
    }
}

