registerClassifierException((content, situation) => {
    const check = "Could not execute post-long-event action. Exception: %s: %s.";
    const result = tryMatch(content, check);
    if(!result) return null;
    const offendingNamespaces = getOffendingNamespaces(content);
    return {
        type: "exception",
        content: result,
        explanation: "Scheduled code could not run. Something that should have happened, didn't.",
        offendingModIds: offendingNamespaces
    }
});
