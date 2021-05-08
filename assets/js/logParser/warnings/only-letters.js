registerClassifierNormal((content, situation) => {
    const check = "Config error in %s: defName %s should only contain letters, numbers, underscores, or dashes.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});