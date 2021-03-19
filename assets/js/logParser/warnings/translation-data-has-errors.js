registerClassifierNormal((content, situation) => {
    const check = "Translation data for language English has %i errors.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});