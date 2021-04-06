registerClassifierNormal((content, situation) => {
    const check = "%s pathing to destroyed thing %s";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});