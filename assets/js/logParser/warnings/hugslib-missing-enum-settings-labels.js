registerClassifierNormal((content, situation) => {
    const check = "[HugsLib][warn] Missing enum setting labels for enum %s";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "warning",
        content: result
    }
});
