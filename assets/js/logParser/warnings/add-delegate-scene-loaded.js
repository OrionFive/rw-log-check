registerClassifierNormal((content, situation) => {
    const check = "Add a delegate to SceneManager.sceneLoaded instead to get notifications after scene loading has completed";
    const result = tryMatch(content, check);
    if(result) return {
        type: "warning",
        content: result
    }
});