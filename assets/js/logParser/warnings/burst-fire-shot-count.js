registerClassifierNormal((content, situation) => {
    const check = "(%s) burst fire shot count is same or higher than auto fire";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});