registerClassifierNormal((content, situation) => {
    const check = "Config error in %s: %s %s has 0 commonality.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});