const writeStateAtPath = (globalState, componentPath, localState) =>
    componentPath.reverse().reduce((childState, childName) => ({children: {[childName]: childState}}), {ownState: localState});
const getOwnStateAtPath = (globalState, componentPath) => componentPath.reduce((result, childName) =>
    result.children[childName], globalState).ownState;

export const statePatcher = (stateManager) => (componentPath, patcher) => {
    const localState = getOwnStateAtPath(stateManager.state, componentPath);
    if (typeof localState !== "object") {
        throw new Error(`componentPath ${componentPath} does not point to an object but to ${localState}`);
    }
    const newLocalState = patcher(localState);
    stateManager.state = writeStateAtPath(stateManager.state, componentPath, newLocalState);
    return newLocalState;
}