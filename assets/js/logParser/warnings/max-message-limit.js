registerClassifierNormal((content, situation) => {
    const check = "Reached max messages limit. Stopping logging to avoid spam.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});