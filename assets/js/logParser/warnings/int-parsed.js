registerClassifierNormal((content, situation) => {
    const check = "Parsed %f as int.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});