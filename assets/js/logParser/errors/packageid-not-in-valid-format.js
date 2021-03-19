registerClassifierNormal((content, situation) => {
    const check = "Mod %s <packageId> (%s) is not in valid format.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "The mod is not configured correctly. Can probably be neglected.",
        offendingModNames: [result[1]]
    }
});
