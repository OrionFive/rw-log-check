registerClassifierNormal((content, situation) => {
    const check = "%s %s has no thingClass. This is a misconfiguration in another mod, but the mod name could not be identified";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "warning",
        content: result
    }
});
