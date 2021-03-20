registerClassifierNormal((content, situation) => {
    const check = "Could not resolve reference to object with loadID %s of type %s.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "An object can't be found. Could come from a removed, updated, or broken mod. Can be an indicator of a broken save file."
    }
});
