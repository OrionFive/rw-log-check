registerClassifierNormal((content, situation) => {
    const check = "Type %s probably needs a StaticConstructorOnStartup attribute, because it has a field %s of type %s.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});