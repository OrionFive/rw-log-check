---
---
*/

const classifiersException = [];
const classifiersNormal = [];

const situations = {
    startup: 'startup',
    runtime: 'runtime'
}

function classifyLog(log, situation) {
    const current = log.lines[log.index];
    const next = log.index < log.lines.length ? log.lines[log.index+1] : null;
    if(!current || current.startsWith("(") || current.startsWith(" ")) return null;

    // Exceptions
    if(next && next.startsWith("  at ") || current.includes("Exception:")) {
        const content = getExceptionContent(log);
        const known = checkClassifiersException(content, situation);

        if(known) return known;
        
        else {
            const offendingNamespaces = getOffendingNamespaces(content);
            return {
                type: "exception",
                content: current,
                unknown: true,
                offendingModIds: offendingNamespaces
            };
        }
    }

    // Warnings & errors
    if(next && next.startsWith("(")) {
        const known = checkClassifiersNormal(current, situation);
        if(known) return known;
        else return {
        type: "error",
        content: current,
        unknown: true
        };
    }
    // Other
    return {
        type: "message",
        content: current,
        unknown: true
    };
}

function getExceptionContent(log) {
    let result = log.lines[log.index];
    let next = result;
    while (next) {
        log.index++;
        if(log.index >= log.lines.length) break;
        next = log.lines[log.index];
        if(!next.startsWith("(Filename:")) {
            result += "\n"
            result += next;
        } else break;
    }
    return result;
}

function checkClassifiersException(content, situation) {
    for (const classifier of classifiersException) {
        const result = classifier(content, situation);
        if(result) return result;
    }
}

function checkClassifiersNormal(content, situation) {
    for (const classifier of classifiersNormal) {
        const result = classifier(content, situation);
        if(result) return result;
    }
}

function registerClassifierException(method) {
    // TODO: cache the checks inside the classifiers
    classifiersException.push(method);
}

function registerClassifierNormal(method) {
    // TODO: cache the checks inside the classifiers
    classifiersNormal.push(method);
}

function tryMatch(content, check) {
    // Escape brackets and such
    check = check.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    check = check.replaceAll("%s", "(.*)"); // capture strings
    check = check.replaceAll("%i", "(-?[\\d]+)"); // capture ints
    check = check.replaceAll("%f", "([+-]?[0-9]+(?:[.][0-9]+)?)"); // capture floats and ints
    //check = `^${check}$`;
    const result = content.match(check);
    //console.log(`Checked against '${check}':\n${content}\n`)
    //if(result) console.log(result);
    return result;
}

function getOffendingNamespaces(content) {
    const match = content.matchAll(/  at(?: \(.*\))* (.+?)\./g); // at (bla bla) namespace.something
    
    function* processMatch() {
        for (const item of match) {
            const ns = item[1];
            if(isKnownNamespace(ns)) continue;
            yield ns;
        }
    }
    return _.uniq([...processMatch()]);
}

function isKnownNamespace(namespace) {
    switch (namespace) {
        case "System": return true;
        case "Verse": return true;
        case "RimWorld": return true;
        default: return false;
    }
}

function getLineCount(text) {
    return (text.match(/\n/g) || '').length;
}

// Load all other script files inside this and subfolders 
{%- assign parent_path = page.path | split:'/' | last -%}
{%- assign parent_path = page.path | remove:  parent_path | append: "logParser/" -%}

{%- for file in site.static_files -%}
{%- if file.path contains parent_path -%}
{%- assign file_name = file.path | remove:  parent_path | remove_first:  "/" | prepend: "logParser/" %} 

// {{ file_name }}:
{% include_relative {{ file_name }} %}

{% endif -%}
{%- endfor -%}