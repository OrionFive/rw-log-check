registerClassifierNormal((content, situation) => {
    const check = "Could not find class %s.%s while resolving node %s. Trying to use Verse.MapComponent instead.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `A map component class can't be found. This means you're missing the relevant mod (${result[1]}) or the mod has been updated and your save file is old.`,
        offendingModIds: [result[1]]
    }
});
