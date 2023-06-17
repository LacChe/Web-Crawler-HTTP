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

function caesarCipher(string, shift) {
    if(shift < 0) return null;
    return string.split('').map((char) => {
        if(
            !(char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) &&
            !(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
        ) {
            return char;
        }
        let shiftedCharCode = char.charCodeAt(0) + shift;
        if(
            !(char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) &&
            !(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
        ) shiftedCharCode -= 26;
        return String.fromCharCode(shiftedCharCode);
    }).join('');
}

function analyzeArray() {

}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray }