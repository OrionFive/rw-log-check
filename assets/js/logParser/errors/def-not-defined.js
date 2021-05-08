registerClassifierNormal((content, situation) => {
    const check = "%s %s is not defined in any loaded mods.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `A mod is trying to use a definition that isn't defined. Likely outdated or you're missing a required mod.`
    }
});