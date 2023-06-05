var displayDiv = document.querySelector('#display');

var button0 = document.querySelector('#btn0');
var button1 = document.querySelector('#btn1');
var button2 = document.querySelector('#btn2');
var button3 = document.querySelector('#btn3');
var button4 = document.querySelector('#btn4');
var button5 = document.querySelector('#btn5');
var button6 = document.querySelector('#btn6');
var button7 = document.querySelector('#btn7');
var button8 = document.querySelector('#btn8');
var button9 = document.querySelector('#btn9');
var buttonAdd = document.querySelector('#add');
var buttonMinus = document.querySelector('#minus');
var buttonMult = document.querySelector('#mult');
var buttonDiv = document.querySelector('#div');
var buttonDec = document.querySelector('#dec');
var buttonClear = document.querySelector('#clear');
var buttonEquals = document.querySelector('#equals');

var lastNumber = '';
var currentNumber = '';
var operator = '';

button0.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '0';
    setDisplay();
    console.log('0');
})

button1.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '1';
    setDisplay();
    console.log('1');
})

button2.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '2';
    setDisplay();
    console.log('2');
})

button3.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '3';
    setDisplay();
    console.log('3');
})

button4.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '4';
    setDisplay();
    console.log('4');
})

button5.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '5';
    setDisplay();
    console.log('5');
})

button6.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '6';
    setDisplay();
    console.log('6');
})

button7.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '7';
    setDisplay();
    console.log('7');
})

button8.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '8';
    setDisplay();
    console.log('8');
})

button9.addEventListener('click', () => {
    if(operator === '=') {
        clear();
    }
    currentNumber += '9';
    setDisplay();
    console.log('9');
})

buttonAdd.addEventListener('click', () => {
    process();
    operator = '+';
    setDisplay();
    console.log('add');
})

buttonMinus.addEventListener('click', () => {
    process();
    operator = '-';
    setDisplay();
    console.log('minus');
})

buttonMult.addEventListener('click', () => {
    process();
    operator = '*';
    setDisplay();
    console.log('mult');
})

buttonDiv.addEventListener('click', () => {
    process();
    operator = '/';
    setDisplay();
    console.log('div');
})

buttonDec.addEventListener('click', () => {
    if(!currentNumber.includes('.')) currentNumber += '.';
    setDisplay();
    console.log('dec');
})

buttonClear.addEventListener('click', () => {
    clear();
    setDisplay();
    console.log('clear');
})

buttonEquals.addEventListener('click', () => {
    process();
    operator = '=';
    setDisplay();
    console.log('eq');
})

function process() {
    var num;
    switch (operator) {
        case '+':
            num = Number(lastNumber) + Number(currentNumber);
            lastNumber = num;
            currentNumber = '';
            break;
        case '-':
            num = Number(lastNumber) - Number(currentNumber);
            lastNumber = num;
            currentNumber = '';
            break;
        case '*':
            num = Number(lastNumber) * Number(currentNumber);
            lastNumber = num;
            currentNumber = '';
            break;
        case '/':
            if(Number(currentNumber) === 0 ) {
                clear();
                return;
            }
            num = Number(lastNumber) / Number(currentNumber);
            lastNumber = num;
            currentNumber = '';
            break;
        case '=':
            break;
        default:
            lastNumber = currentNumber;
            currentNumber = '';
            break;
    }
}

function setDisplay() {
    displayDiv.textContent = lastNumber + 
    (operator === '=' ? '' : operator) + 
    currentNumber;
}

function clear() {
    operator = '';
    lastNumber = '';
    currentNumber = '';
}