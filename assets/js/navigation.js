// ## GIVEN ##

const NR_OF_BACKGROUNDS = 3;


function initNavigation(){
    backgroundChange();
}

function navigate(e){
    const targetId = e.currentTarget.getAttribute('data-target');

    navigateToPage(targetId);
}

function navigateToPage(targetId){
    const $pages = document.querySelectorAll('.page');
    $pages.forEach(page => {
        page.classList.add('hidden');
    });

    const targetPage = document.querySelector(`#${targetId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}


// ## YOUR ADDED FUNCTIONS ##

function backgroundChange(){
    const $body = document.querySelector('body');

    const random = getRandomNumber(NR_OF_BACKGROUNDS, 1)

    $body.classList.add(`background-0${random}`);
}