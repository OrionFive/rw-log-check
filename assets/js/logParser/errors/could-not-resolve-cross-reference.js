registerClassifierNormal((content, situation) => {
    const check = "Could not resolve cross-reference: No %s named %s found to give to %s %s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "A definition can't be found. Could come from a required mod that is not active. Or the mod in question is outdated."
    }
});
