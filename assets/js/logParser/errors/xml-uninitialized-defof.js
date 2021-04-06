registerClassifierNormal((content, situation) => {
    const check = "Tried to use an uninitialized DefOf of type %s. DefOfs are initialized right after all defs all loaded. Uninitialized DefOfs will return only nulls. (hint: don't use DefOfs as default field values in Defs, try to resolve them in ResolveReferences() instead) Debug info: curParent=%s.%s+%s ";
    const result = tryMatch(content, check);
    if(!result) return null;
    return {
        type: "error",
        content: result,
        explanation: "Probably the mod is not set up correctly.",
        offendingModIds: [result[2]]
    }
});
