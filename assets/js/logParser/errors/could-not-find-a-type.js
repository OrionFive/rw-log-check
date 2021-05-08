registerClassifierNormal((content, situation) => {
    const check = "Could not find a type named %s.%s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `A mod (probably ${result[1]}) is trying to use a type that doesn't exist. Likely misconfigured or outdated. I recommend not using it.`,
        offendingModIds: [result[1]]
    }
});
