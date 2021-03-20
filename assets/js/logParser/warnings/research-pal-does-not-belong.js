registerClassifierNormal((content, situation) => {
    const check = "ResearchPal :: Research %s does not belong to any mod";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});