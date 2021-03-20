registerClassifierNormal((content, situation) => {
    const check = "Could not resolve cross-reference to %s named %s ";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});