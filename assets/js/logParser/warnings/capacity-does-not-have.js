registerClassifierNormal((content, situation) => {
    const check = "Capacity %s does not have any %s associated with it.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});