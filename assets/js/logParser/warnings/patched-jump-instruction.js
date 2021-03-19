registerClassifierNormal((content, situation) => {
    const check = "Patched jump instruction at %i";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});
