registerClassifierNormal((content, situation) => {
    const check = "Key binding conflict: %s and %s are both bound to %s.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});