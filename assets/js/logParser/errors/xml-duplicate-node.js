registerClassifierNormal((content, situation) => {
    const check = "XML error: Duplicate XML node name %s in this XML block: <%s><defName>%s</defName>";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `The mod that introduces (or overrides) ${result[3]} is not set up correctly.`
    }
});
