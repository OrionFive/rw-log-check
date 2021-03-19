registerClassifierNormal((content, situation) => {
    const check = "Running incremental garbage collection";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});