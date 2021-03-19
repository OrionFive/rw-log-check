registerClassifierNormal((content, situation) => {
    const check = "ResearchPal :: %s has a lower techlevel than (one of) it's prerequisites";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});