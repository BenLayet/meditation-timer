// function that negate a predicate
export function negate(predicate) {
    return function (...args) {
        return !predicate(...args);
    };
}