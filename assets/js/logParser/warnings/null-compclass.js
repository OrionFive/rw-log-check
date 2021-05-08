registerClassifierNormal((content, situation) => {
    const check = "Config error in %s: %s has CompProperties with null compClass.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "warning",
        content: result
    }
});
