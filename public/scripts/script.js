document.addEventListener("DOMContentLoaded", setup)

async function setup(){
    await getData().catch(e => {
        let errorElement = document.querySelector('#error');
        errorElement.textContent = e.message;
        errorElement.style.visibility = 'visible'
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

    populateDatalist(content)
}

function populateDatalist(json) {
    let datalist = document.querySelector('#symbols')
    for (let element of json){
        let newData = document.createElement('option')
        newData.value = element.symbol
        datalist.appendChild(newData)
    }
}