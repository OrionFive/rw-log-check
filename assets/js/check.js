---
---
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const logInput = document.querySelector("#input-log input");
const logButton = document.querySelector("#input-log button");
const errorBox = document.querySelector(".error-bubble");
const successBox = document.querySelector(".success-bubble");
const output = document.querySelector("#output");
const info = document.querySelector("#info");
const outputHeader = document.querySelector("#output-header");

logInput.addEventListener('input', () => { logButton.disabled = false; });
logInput.addEventListener('focus', onLogInputFocus());
logInput.focus();
window.setTimeout(onLogInputFocus, 50);
output.style.display = "none";
outputHeader.style.display = "none";

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

    output.style.display = "block";
    outputHeader.style.display = "block";

    // STARTUP (from start to first load)
    checkStartup(log);

    // RUNTIME (from last load to end)
    checkLoadedGame(log);
}

function checkStartup(log) {
    const startupLogs = getStartupLogs(log);
    const startupErrors = getErrors(startupLogs);
    const list = createOutputList("startup-errors-list", startupErrors, newLogListItem, "Errors at startup");
    output.append(list);
}

function checkLoadedGame(log) {
    const startLoadedIndex = log.findIndex(l => l.startsWith("Loading game from file"));
    const loadedLog = log.slice(startLoadedIndex);

    const mods = getLoadedMods(loadedLog);
    const list = createOutputList("active-mods-list", mods, newListItem, "Active mods");
    output.prepend(list);

    const consoleLogs = getConsoleLogs(loadedLog);
    const warnings = getWarnings(consoleLogs);
    const errors = getErrors(consoleLogs);
    const combined = warnings.concat(errors);
    const list2 = createOutputList("warnings-errors-runtime-list", combined, newLogListItem, "Errors & warnings after load");
    output.append(list2);
}

function getLoadedMods(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !l.startsWith("  ")); // find end of mod list
    return loadedLog.slice(0, lastModIndex).map(mod => _.trimStart(mod, ' -')); // remove end and trim away "  - "
}

function getStartupLogs(loadedLog) {
    const firstLineIndex = loadedLog.findIndex(l => l.startsWith("Log file contents:"));
    const lastLineIndex = loadedLog.findIndex(l => l.startsWith("Loading game from file"));

    const sliced = loadedLog.slice(firstLineIndex, lastLineIndex);
    const parsed = iterateLog(sliced, situations.startup);
    return _.groupBy(parsed, 'content');
}

function getConsoleLogs(loadedLog) {
    loadedLog = loadedLog.slice(1); // skip first row
    const lastModIndex = loadedLog.findIndex(l => !l.startsWith("  ")); // find end of mod list
    const sliced = loadedLog.slice(lastModIndex);
    const parsed = iterateLog(sliced, situations.runtime);
    return _.groupBy(parsed, 'content');
}

function iterateLog(slicedLog, situation) {
    const log = { lines: slicedLog }; // pass log as object, so we can change index
    const result = [];
    for (log.index = 0; log.index < log.lines.length; log.index++) {
        const output = parseOutput(log, situation);
        if(output) result.push(output);
    }
    return result;
}

function getWarnings(consoleLogs) {
    // consoleLogs is an object from _.groupBy, convert to array of arrays
    const logsArray = Object.values(consoleLogs);
    return _.filter(logsArray, log => log && log[0] && log[0].type === "warning");
}
function getErrors(consoleLogs) {
    // consoleLogs is an object from _.groupBy, convert to array of arrays  
    const logsArray = Object.values(consoleLogs);
    return _.filter(logsArray, log => log && log[0] && (log[0].type === "error" || log[0].type === "exception"));
}

function parseOutput(log, situation) {
    const result = classifyLog(log, situation);
    // Add situations
    if(result) result.situation = situation;
    return result;
}

function createOutputList(listId, items, itemConstructor, title) {
    if(items.length == 0) return;

    const list = document.createElement("section");
    list.id = listId;
    
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
    return list;
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
    const flex = document.createElement("div");
    const content = document.createElement("p");
    if(typeof logItems[0].content === 'object') {
        content.innerText = `(${logItems.length}x) ${logItems[0].content[0]}`;
    } else {
        content.innerText = `(${logItems.length}x) ${logItems[0].content}`;
    }
    content.title = _.upperFirst(logItems[0].type);
    if(logItems[0].explanation) content.title = `${_.upperFirst(logItems[0].type)}:\n${logItems[0].explanation}`;
    // Unknown
    if(logItems[0].unknown) {
        const unknown = document.createElement("p");
        unknown.innerText = "?";
        unknown.classList.add("unknown-icon");
        unknown.title = "This output is not in the database.";
        flex.append(unknown);
        content.title = "Unknown";
        content.classList.add("unknown");
    } else {
        content.classList.add(logItems[0].type);
    }
    
    // Exception
    if(logItems[0].type === "exception") {
        const exception = document.createElement("p");
        exception.innerText = "!";
        exception.classList.add("exception-icon");
        exception.title = "This is an exception. Exceptions cause other (often unrelated) code to not run.";
        flex.append(exception);
        content.classList.add("exception"); // exceptions always highlight, even if unknown
    }
    // Content
    flex.append(content);
    // Offending mods
    if(logItems[0].offendingModNames) {
        const offending = document.createElement("p");
        offending.innerText = logItems[0].offendingModNames.join(", ");
        offending.classList.add("offending");
        offending.title = "Mods that are probably causing this. In order of likeliness.";
        flex.append(offending);
    }
    // TODO: Automatically turn mod ids to mod names
    if(logItems[0].offendingModIds) {
        const offending = document.createElement("p");
        offending.innerText = logItems[0].offendingModIds.join(", ");
        offending.classList.add("offending");
        offending.title = "Mods that are probably causing this.";
        flex.append(offending);
    }
    li.append(flex);
    return li;
}

/* LOAD LOG PARSER
{% include_relative logParser/logParser.js %}