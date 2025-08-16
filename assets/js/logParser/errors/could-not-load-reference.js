registerClassifierNormal((content, situation) => {
    const check = "Could not load reference to %s named %s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "A definition reference can't be loaded. This usually means a required mod is missing or the referenced item was removed.",
        offendingModIds: [result[2]]
    }
});