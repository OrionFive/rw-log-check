registerClassifierNormal((content, situation) => {
    const check = "Null key while loading dictionary of %s and %s. label=%s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "A mod is trying to load a dictionary with null keys. This indicates a configuration error in the mod's XML definitions.",
        offendingModIds: [result[2].split('.')[0]]
    }
});