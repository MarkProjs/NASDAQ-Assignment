document.addEventListener("DOMContentLoaded", setup)

//submit button
let button = document.querySelector("#submit");

/**
 * function to call if the DOM is loaded
 */
async function setup(){
    await getData().catch(e => {
        console.error(e.message)
    });
}

/**
 * function that fetches the whole json and pass it to the populateDatalist function
 */
async function getData(){
    let url = 'http://localhost:3000/api'
    let response = await fetch(url);
    let content;
    if(response.ok) {
        content = await response.json();
    }
    else {
        throw new Error("Status code: " + response.status);
    }

    populateDatalist(content);
}

/**
 * function that populates the datalist in which the dropdown contains the symbols
 * @param {object} json 
 */
function populateDatalist(json) {
    let datalist = document.querySelector('#symbols');
    for (let element of json){
        let newData = document.createElement('option');
        newData.value = element.symbol;
        datalist.appendChild(newData);
    }
}

//Event listner for the submit button
button.addEventListener("click", () => {
    let nasdaq = document.querySelector("#symbol-choice").value;
    fetchStock(nasdaq)
    .catch((err) => {
        let currentPrice = document.querySelector('#current_price');
        currentPrice.textContent = "ERROR: can't have empty symbol"
        console.error(err.message)
      });
})

/**
 * async function that fetches the api necessary for a stock
 * @param {string} nasdaq 
 */
async function fetchStock(nasdaq) {
    let url = `http://localhost:3000/api/nasdaq/${nasdaq}`;
    let resp = await fetch(url);
    let content;
    if(resp.ok) {
        content = await resp.json();
    }
    else {
        throw new Error("Status code: " + resp.status);
    }

    currentPriceStock(content, nasdaq);
}

/**
 * function that changes the paragraph whether it shows the current price of a certain stock or it shows en error
 * @param {Object} content 
 * @param {string} nasdaq 
 */
async function currentPriceStock(content, nasdaq) {
    let currentPrice = document.querySelector('#current_price');
    if (content.c > 0){
        currentPrice.textContent = `Current price of ${nasdaq} is: $${content.c}`
    }
    else{
        currentPrice.textContent = "ERROR: Symbol not found, please try again"
    }
}
