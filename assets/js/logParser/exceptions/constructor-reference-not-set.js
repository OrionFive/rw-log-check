registerClassifierException((content, situation) => {
    const check = "Object reference not set to an instance of an object in %s(%s)  at %s..ctor";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "exception",
        content: result,
        explanation: "An object of the mod could not be created. Recommended to remove the mod.",
        offendingModNames: [result[2]]
    }
});
