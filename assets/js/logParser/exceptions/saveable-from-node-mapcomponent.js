registerClassifierException((content, situation) => {
    const check = "SaveableFromNode exception: System.ArgumentException: Can't load abstract class Verse.MapComponent";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "exception",
        content: result,
        explanation: "This happens when a broken map component was found (leftover from a removed mod?)."
    }
});