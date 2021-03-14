const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const logInput = document.querySelector("#input-log input");
const logButton = document.querySelector("#input-log button");

logInput.addEventListener('input', () => { logButton.disabled = false; });

if(urlParams.has('log'))
{
    logInput.value = urlParams.get('log');
    logButton.disabled = true;

    loadUrl(logInput.value);
}

function loadUrl(url) {
    const fetch = require('node-fetch');
    const loadPage = async () => {
        const response = await fetch(url)
        return response.text()
    }

    result = {loadPage};
    console.log(result);
}