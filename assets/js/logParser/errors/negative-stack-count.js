registerClassifierNormal((content, situation) => {
    const check = "Tried to set ThingCount stack count to -%i. thing=%s%i";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `A mod tries to set the size of a ${result[2]} stack to an invalid size.`
    }
});
