registerClassifierException((content, situation) => {
    const check = "System.NullReferenceException: Object reference not set to an instance of an object";
    const result = tryMatch(content, check);
    if(!result) return null;
    const offendingNamespaces = getOffendingNamespaces(content);
    return {
        type: "exception",
        content: result,
        explanation: "This is a very common error that doesn't say much. Usually this is a sign of poor programming or something unexpected that happened (a mod conflict).",
        offendingModIds: offendingNamespaces
    }
});
