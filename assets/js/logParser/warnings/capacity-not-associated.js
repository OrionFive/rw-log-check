registerClassifierNormal((content, situation) => {
    const check = "%s :: Tag %s is not associated with any pawnCapacity. This may be intentional.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});