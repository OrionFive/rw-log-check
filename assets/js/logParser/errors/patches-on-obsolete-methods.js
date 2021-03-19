registerClassifierNormal((content, situation) => {
    const check = "[%s] Patches on methods annotated as Obsolete were detected";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "The mod patches old methods. Mod might be outdated."
    }
});
