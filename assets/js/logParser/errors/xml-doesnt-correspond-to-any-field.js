registerClassifierNormal((content, situation) => {
    const check = "XML error: %s doesn't correspond to any field in type %s.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "Either a mod is configured poorly, or your RimWorld / a mod is outdated."
    }
});
