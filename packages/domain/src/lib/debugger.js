export const statePatcher = (stateManager) => (key, subPatch) => {
    let parent = {...stateManager.state};
    if (typeof key === "undefined") {
        return;
    }
    if (typeof key === "object") {
        subPatch = key;
        key = "";
    }
    if (key === "") {
        stateManager.state = subPatch;
        return;
    }
    const keys = key.split('.');
    keys.forEach((key, i) => {
        if (i === keys.length - 1) {
            parent[key] = subPatch;
        } else {
            parent = parent[key];
            if (typeof parent !== "object") {
                throw new Error(`key ${key} does not point to an object but to ${parent}`);
            }
        }
    });
}