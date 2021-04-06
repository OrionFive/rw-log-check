registerClassifierNormal((content, situation) => {
    const check = "Error in %s: Specified cast is not valid.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "This looks like an unexpected situation (mod conflict?) or poor programming."
    }
});
