function capitalize(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}

function reverseString(string) {
    return string.split('').reduce((acc, char) => char + acc, '');
}

function calculator() {
    let add = function add(x, y) {
        return x + y;
    }
    let subtract = function subtract(x, y) {
        return x - y;
    }
    let divide = function divide(x, y) {
        return x / y;
    }
    let multiply = function multiply(x, y) {
        return x * y;
    }
    return {
        add,
        subtract,
        divide,
        multiply
    }
}

function caesarCipher() {

}

function analyzeArray() {

}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray }