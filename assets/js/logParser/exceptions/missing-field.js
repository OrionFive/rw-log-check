registerClassifierException((content, situation) => {
    const check = "System.MissingFieldException: Field 'Verse.%s' not found.";
    const result = tryMatch(content, check);
    if(!result) return null;
    const offendingNamespaces = getOffendingNamespaces(content);
    return {
        type: "exception",
        content: result,
        explanation: "A mod is trying to access a non-existant field. This probably means your RimWorld is outdated (or set to beta), or the mod is really outdated.",
        offendingModIds: offendingNamespaces
    }
});
