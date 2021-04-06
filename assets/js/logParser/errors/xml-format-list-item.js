registerClassifierNormal((content, situation) => {
    const check = "XML format error: List item found with name that is not <li>, and which does not have a custom XML loader method";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `The XML of a mod is written wrong. This can be due to poor modding or an invalid patch (mod conflict).`
    }
});
