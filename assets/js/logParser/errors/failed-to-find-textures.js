registerClassifierNormal((content, situation) => {
    const check = "Failed to find any textures at %s while constructing Multi";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "A mod couldn't find its own textures. Might cause glitches."
    }
});
