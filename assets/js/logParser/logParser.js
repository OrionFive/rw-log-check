---
---
*/

function classifyLog(logs, index) {
    const current = logs[index];
    const next = index < logs.length ? logs[index+1] : null;
    
    if(!current || current.startsWith("(") || current.startsWith(" ")) return null;

    //const known = checkDatabase(logs, index);
    //if(known) return known;
    

    if(current.includes("Exception")) return {
        type: "exception",
        content: current
    };
    if(next != null && next.startsWith("(")) return {
        type: "error",
        content: current
    };
    else return {
        type: "message",
        content: current
    };
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