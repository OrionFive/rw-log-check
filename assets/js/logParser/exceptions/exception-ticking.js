registerClassifierException((content, situation) => {
    const check = "Exception ticking %s (at %s).";
    const result = tryMatch(content, check);
    if(!result) return null;
    const offendingNamespaces = getOffendingNamespaces(content);
    return {
        type: "exception",
        content: result,
        explanation: "An object failed to update. This can cause strange behavior of the object.",
        offendingModIds: offendingNamespaces
    }
});
