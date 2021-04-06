registerClassifierNormal((content, situation) => {
    const check = "Couldn't find exact match for backstory";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});