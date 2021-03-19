registerClassifierNormal((content, situation) => {
    const check = "ResearchPal :: 	redundant prerequisites for %s: %s";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});