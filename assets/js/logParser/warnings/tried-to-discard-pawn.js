registerClassifierNormal((content, situation) => {
    const check = "Tried to discard a world pawn %s.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});