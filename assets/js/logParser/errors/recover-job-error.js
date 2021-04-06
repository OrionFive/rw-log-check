registerClassifierNormal((content, situation) => {
    const check = "An error occurred while starting an error recover job.";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "You probably have to check the error that happened before this. This error doesn't tell us much."
    }
});
