registerClassifierNormal((content, situation) => {
    const check = "Children: Settings: Species not found(%s)! (%s)";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: `A species set by the Children mod could not be found. Maybe a mod broke or you have removed it. Check your Children settings.`
    }
});
