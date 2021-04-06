registerClassifierNormal((content, situation) => {
    const check = "TryMakePreToilReservations() returned false for a non-queued job right after StartJob(). This should have been checked before.";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});