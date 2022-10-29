document.addEventListener("DOMContentLoaded", setup)

let button = document.querySelector("#submit");

async function setup(){
    await getData().catch(e => {
        let errorElement = document.querySelector('#error');
        errorElement.textContent = e.message;
        errorElement.style.visibility = 'visible';
    });
}

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

function populateDatalist(json) {
    let datalist = document.querySelector('#symbols');
    for (let element of json){
        let newData = document.createElement('option');
        newData.value = element.symbol;
        datalist.appendChild(newData);
    }
}

button.addEventListener("click", () => {
    let nasdaq = document.querySelector("#symbol-choice").value;
    fetchStock(nasdaq);
})

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

async function currentPriceStock(content, nasdaq) {
    let currentPrice = document.querySelector('#current_price');
    if (content.c > 0){
        currentPrice.textContent = `Current price of ${nasdaq} is: $${content.c}`
    }
    else{
        currentPrice.textContent = "ERROR: Symbol not found, please try again"
    }
}