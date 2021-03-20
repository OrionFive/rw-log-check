registerClassifierException((content, situation) => {
    const check = "%s threw exception in WorkGiver %s: %s: %s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "exception",
        content: result,
        explanation: "A pawn failed to get specific work. Check which mod could be related to this work."
    }
});
