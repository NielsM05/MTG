"use strict";
// ## GIVEN ##
let data = {};
function initSubscribePage(){
    addSetForm();
    defaultValues();
    document.querySelector("input[type='submit']").addEventListener('click', filledIn);
}


// ## YOUR ADDED FUNCTIONS ##
function addSetForm(){
    /* I want the different sets found in config.js added in a radiobutton
    * to the index.html file. */
    const $sets = document.querySelector("#sets");
    const $configSet = config.sets ;
    for (const $name in $configSet){
        let $input = `<input type="radio" name='cardset' id='${$name}'><label for="${$name}" >${$configSet[$name]}</label>`;
        $sets.insertAdjacentHTML('afterend', $input);

    }
}

function defaultValues(){
    const $amount = document.querySelector("#boost");
    $amount.value = config.default_nr_of_boosters;
    const $sets = document.querySelectorAll("input[type=radio]");
    for (let i = 0; i <$sets.length; i++){
        if ($sets[i].id === config.default_set){
            $sets[i].checked = true;
        }
    }
}
function filledIn(e){
    if (document.querySelector("form").checkValidity() === true){
        e.preventDefault();
        data = saveData();
        initBoostersPage();
        navigate(e);
    }
}

function saveData(){
    const $data = {
        "amount": document.querySelector("#boost").value,
        "set": document.querySelector("input[type='radio']:checked").id,
        "name": document.querySelector("#name").value,
        "setName": document.querySelector("input[type='radio']:checked").nextSibling.textContent
    }

    return $data;
}
function getSavedData(){
    return data;
}



