---
---
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const logInput = document.querySelector("#input-log input");
const logButton = document.querySelector("#input-log button");
const errorBox = document.querySelector(".error-bubble");
const successBox = document.querySelector(".success-bubble");

logInput.addEventListener('input', () => { logButton.disabled = false; });
logInput.addEventListener('focus', onLogInputFocus());
logInput.focus();
window.setTimeout(onLogInputFocus, 50);

if(urlParams.has('log'))
{
    logInput.value = urlParams.get('log');
    logButton.disabled = true;

    loadUrl(logInput.value);
}

function onLogInputFocus() {
    logInput.setSelectionRange(0, this.value?.length); logInput.select(); 
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
    const log = data.split('\n');

    document.getElementById("output").style.visibility = "visible";

    // STARTUP (from start to first load)
    checkStartup(log);

    // RUNTIME (from last load to end)
    checkLoadedGame(log);
}

function checkStartup(log) {

    const startupLogs = getStartupLogs(log);
    const startupErrors = getErrors(startupLogs);
    outputList("startup-errors-list", startupErrors, newLogListItem, "Errors at startup");
}

function checkLoadedGame(log) {
    const startLoadedIndex = log.findIndex(l => l.startsWith("Loading game from file"));
    const loadedLog = log.slice(startLoadedIndex);

    const mods = getLoadedMods(loadedLog);
    outputList("active-mods-list", mods, newListItem, "Active mods");

    const consoleLogs = getConsoleLogs(loadedLog);
    const warnings = getWarnings(consoleLogs);
    const errors = getErrors(consoleLogs);
    const combined = warnings.concat(errors);
    outputList("warnings-errors-runtime-list", combined, newLogListItem, "Errors & warnings after load");
}

function getLoadedMods(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !l.startsWith("  ")); // find end of mod list
    return loadedLog.slice(0, lastModIndex).map(mod => mod.trimLeft(' -')); // remove end and trim away "  - "
}

function getStartupLogs(loadedLog) {
    const firstLineIndex = loadedLog.findIndex(l => l.startsWith("Log file contents:"));
    const lastLineIndex = loadedLog.findIndex(l => l.startsWith("Loading game from file"));

    const sliced = loadedLog.slice(firstLineIndex, lastLineIndex);
    const parsed = sliced.map((log, i) => parseOutput(sliced, i)).filter(log => log);
    return _.groupBy(parsed, 'content');
}

function getConsoleLogs(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !l.startsWith("  ")); // find end of mod list
    const sliced = loadedLog.slice(lastModIndex);
    const parsed = sliced.map((log, i) => parseOutput(sliced, i)).filter(log => log);
    return _.groupBy(parsed, 'content');
}

function getWarnings(consoleLogs) {
    return _.filter(consoleLogs, log => log[0].type === "warning");
}
function getErrors(consoleLogs) {
    return _.filter(consoleLogs, log => log[0].type === "error" || log[0].type === "exception");
}

function parseOutput(consoleLogs, index) {
    return classifyLog(consoleLogs, index);
}

function outputList(listId, items, itemConstructor, title) {
    if(items.length == 0) return;

    const output = document.getElementById("output");
    const list = document.createElement("section");
    list.id = listId;
    output.append(list);
    
    const header = document.createElement("h3");  
    const amount = _.isArray(items[0]) ? _.sumBy(items, i=>i.length) : items.length;
    header.innerText = `${title} (${amount})`;
    list.append(header);

    const ul = document.createElement("ul");

    items.forEach(item => {
        let child = itemConstructor(item);
        ul.appendChild(child);
    });
    list.append(ul);
}

function newListItem(text) {
    const li = document.createElement("li");
    const content = document.createElement("p");
    content.innerText = text;
    li.append(content);
    return li;
}

function newLogListItem(logItems) {
    const li = document.createElement("li");
    const content = document.createElement("p");
    if(typeof logItems[0].content === 'object') {
        content.innerText = `(${logItems.length}x) ${logItems[0].content[0]}`;
    } else {
        content.innerText = `(${logItems.length}x) ${logItems[0].content}`;
    }
    content.title = _.upperFirst(logItems[0].type);
    if(logItems[0].explanation) content.title = `${_.upperFirst(logItems[0].type)}:\n${logItems[0].explanation}`;
    content.classList.add(logItems[0].type);
    // Unknown
    if(logItems[0].unknown) {
        const unknown = document.createElement("p");
        unknown.innerText = "?";
        unknown.classList.add("unknown");
        unknown.title = "This output is not in the database.";
        li.append(unknown);
    }
    // Content
    li.append(content);
    // Offending mods
    if(logItems[0].offendingModNames) {
        const offending = document.createElement("p");
        offending.innerText = logItems[0].offendingModNames.join(", ");
        offending.classList.add("offending");
        offending.title = "Mods that are probably causing this.";
        li.append(offending);
    }
    // TODO: Automatically turn mod ids to mod names
    if(logItems[0].offendingModIds) {
        const offending = document.createElement("p");
        offending.innerText = logItems[0].offendingModIds.join(", ");
        offending.classList.add("offending");
        offending.title = "Mods that are probably causing this.";
        li.append(offending);
    }
    return li;
}

/* LOAD LOG PARSER
{% include_relative logParser/logParser.js %}