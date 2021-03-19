registerClassifierException((content, situation) => {
    const check = "Error while instantiating a mod of type %s: System.Reflection.TargetInvocationException";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "exception",
        content: result,
        explanation: "The mod couldn't get initialized. Recommended to remove the mod.",
        offendingModIds: [result[1]]
    }
});