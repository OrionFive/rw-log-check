registerClassifierNormal((content, situation) => {
    const check = "Translation data for language %s has %i errors.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `Probably the language ${result[1]} of one of the mods is outdated.`
    }
});
