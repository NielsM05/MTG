
// ## GIVEN ##

function initThankYouPage(){
    let name = getSavedData().name;
    let set = getSavedData().setName;
    const $userNameSpan = document.querySelector('#userName');
    const $userSetSpan = document.querySelector('#userSet');
    $userNameSpan.textContent = name;
    $userSetSpan.textContent = set;
}

// ## YOUR ADDED FUNCTIONS ##