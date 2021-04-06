registerClassifierException((content, situation) => {
    const check = "Exception in %s: System.InvalidCastException: Specified cast is not valid.";
    const result = tryMatch(content, check);
    if(!result) return null;
    const offendingNamespaces = getOffendingNamespaces(content);
    return {
        type: "exception",
        content: result,
        explanation: "Usually this is a sign of poor programming or something unexpected that happened (a mod conflict).",
        offendingModIds: offendingNamespaces
    }
});
