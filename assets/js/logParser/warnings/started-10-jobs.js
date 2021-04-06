registerClassifierNormal((content, situation) => {
    const check = "%s started 10 jobs in 10 ticks.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});