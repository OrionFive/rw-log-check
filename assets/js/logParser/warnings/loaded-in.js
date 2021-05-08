registerClassifierNormal((content, situation) => {
    const check = "%s loaded in %s";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});