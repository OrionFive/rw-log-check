const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const logInput = document.querySelector("#input-log input");
const logButton = document.querySelector("#input-log button");
const errorBox = document.querySelector(".error-bubble");
const successBox = document.querySelector(".success-bubble");

logInput.addEventListener('input', () => { logButton.disabled = false; });

if(urlParams.has('log'))
{
    logInput.value = urlParams.get('log');
    logButton.disabled = true;

    loadUrl(logInput.value);
}

function loadUrl(url) {
    const id = url.split('/').pop();
    fetch("https://api.github.com/gists/"+id, {
        method: 'GET'
    }).then(response=>response.json()).then(checkResponse).then(parseUrl, onLoadFail).then(onParseSuccess, onParseFail);
}

function onParseSuccess(e) {
    successBox.style.display = "inherit";
}

function onLoadFail(e) {
    errorBox.style.display = "inherit";
    errorBox.innerText = "ERROR: Couldn't load log.";
    console.error(e);
}

function onParseFail(e) {
    errorBox.style.display = "inherit";
    errorBox.innerText = "ERROR: Unexpected problem while scanning log.";
    console.error(e);
}

function checkResponse(response){
    return response.files["output_log.txt"].content;
}

function parseUrl(data) {
    const log = v.split(data, '\n');

    checkLoadedGame(log);
}

function checkLoadedGame(log) {
    const startLoadedIndex = log.findIndex(l => v.startsWith(l, "Loading game from file"));
    const loadedLog = log.slice(startLoadedIndex);

    document.getElementById("output").style.visibility = "visible";

    // STARTUP


    // RUNTIME
    const mods = getLoadedMods(loadedLog);
    outputList("active-mods-list", mods, newListItem);

    const consoleLogs = getConsoleLogs(loadedLog);
    console.log(consoleLogs);
    const warnings = getWarnings(consoleLogs);
    const errors = getErrors(consoleLogs);
    const combined = warnings.concat(errors);
    outputList("warnings-errors-runtime-list", combined, newLogListItem);
}

function getLoadedMods(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !v.startsWith(l, "  ")); // find end of mod list
    return loadedLog.slice(0, lastModIndex).map(mod => v.trimLeft(mod, ' -')); // remove end and trim away "  - "
}

function getConsoleLogs(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !v.startsWith(l, "  ")); // find end of mod list
    const sliced = loadedLog.slice(lastModIndex);
    console.log(sliced);
    const parsed = sliced.map((log, i) => parseOutput(sliced, i)).filter(log => log);
    return _.groupBy(parsed, 'content');
}

function getWarnings(consoleLogs) {
    return _.filter(consoleLogs, log => log[0].type === "warning");
}
function getErrors(consoleLogs) {
    return _.filter(consoleLogs, log => log[0].type === "error");
}

function parseOutput(consoleLogs, index) {
    const current = consoleLogs[index];
    const next = index < consoleLogs.length ? consoleLogs[index+1] : null;
    
    if(!current || current.startsWith("(") || current.startsWith(" ")) return null;
    if(next != null && next.startsWith("(")) return {
        type: "error",
        content: current
    }
    else return {
        type: "message",
        content: current
    }
}

function outputList(listId, items, constructor) {
    const list = document.querySelector(`#${listId}`);
    const header = list.querySelector("h3");

    header.innerText += ` (${items.length})`;

    const ul = document.createElement("ul");

    items.forEach(item => {
        ul.appendChild(constructor(item));
    });
    list.append(ul);
}

function newListItem(text) {
    const li = document.createElement("li");
    li.innerHTML = text;
    return li;
}

function newLogListItem(logItems) {
    const li = document.createElement("li");
    li.innerHTML = `(${logItems.length}x) ${logItems[0].content}`;
    //li.title = logItems;
    li.classList.add(logItems[0].type);
    return li;
}