export const isPreparationTimeUp = (state) => {
    return state.remainingSeconds === 0;
}