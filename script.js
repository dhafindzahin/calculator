const calculation = document.getElementById('calculation');
const numberBtn = [...document.getElementsByClassName('numberBtn')];
const operationBtn = [...document.getElementsByClassName('operationBtn')];
const prefixBtn = document.getElementById('prefix');
const decimalBtn = document.getElementById('decimal');
const equalBtn = document.getElementById('equal');
const removeBtn = document.getElementById('remove');
const clearBtn = document.getElementById('clear');
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const operation = document.getElementById('operation');
const result = document.getElementById('result');

function addNumber(a, b) {
    return a + b;
}

function subtractNumber(a, b) {
    return a - b;
}

function multiplyNumber(a, b) {
    return a * b;
}

function divideNumber(a, b) {
    if (b === 0) return 'lmao';
    return a / b;
}

function modularNumber(a, b) {
    return a % b;
}

function clear() {
    firstNumber.innerText = '';
    secondNumber.innerText = '';
    operation.innerText = '';
    result.innerText = '';
}

numberBtn.forEach(element => {
    element.addEventListener('click', (e) => {
        if (result.innerText) clear();
        operation.innerText ? secondNumber.innerText += e.target.innerText : firstNumber.innerText += e.target.innerText;
    });
});

prefixBtn.addEventListener('click', () => {
    if (result.innerText) return;
    if (operation.innerText) {
        secondNumber.innerText.includes('-') ? secondNumber.innerText = secondNumber.innerText.slice(1) : secondNumber.innerText = '-' + secondNumber.innerText;
    }
    else {
        firstNumber.innerText.includes('-') ? firstNumber.innerText = firstNumber.innerText.slice(1) : firstNumber.innerText = '-' + firstNumber.innerText;
    }
});

decimalBtn.addEventListener('click', () => {
    if (operation.innerText) {
        secondNumber.innerText.includes('.') || !secondNumber.innerText ? null : secondNumber.innerText += '.';
    }
    else {
        firstNumber.innerText.includes('.') || !firstNumber.innerText ? null : firstNumber.innerText += '.';
    }
});

operationBtn.forEach(element => {
    element.addEventListener('click', (e) => {
        if (result.innerText) {
            firstNumber.innerText = isNaN(result.innerText.slice(1)) ? 0 : result.innerText.slice(1);
            operation.innerText = e.target.innerText;
            secondNumber.innerText = '';
            result.innerText = '';
        }
        else if (firstNumber.innerText && !secondNumber.innerText) {
            operation.innerText = e.target.innerText;
        }
    });
});

equalBtn.addEventListener('click', () => {
    const num1 = Number(firstNumber.innerText);
    const num2 = Number(secondNumber.innerText);
    const operate = operation.innerText;

    if (operate === '+') {
        result.innerText = '= ' + addNumber(num1, num2);
    }
    if (operate === '-') {
        result.innerText = '= ' + subtractNumber(num1, num2);
    }
    if (operate === 'x') {
        result.innerText = '= ' + multiplyNumber(num1, num2);
    }
    if (operate === '/') {
        result.innerText = '= ' + divideNumber(num1, num2);
    }
    if (operate === '%') {
        result.innerText = '= ' + modularNumber(num1, num2);
    }
});

removeBtn.addEventListener('click', () => {
    if (secondNumber.innerText) {
        secondNumber.innerText = secondNumber.innerText.slice(0, -1);
    }
    else if (operation.innerText) {
        operation.innerText = operation.innerText.slice(0, -1);
    }
    else if (firstNumber.innerText) {
        firstNumber.innerText = firstNumber.innerText.slice(0, -1);
    }
    result.innerText = '';
});

clearBtn.addEventListener('click', () => clear());


document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        if (result.innerText) clear();
        operation.innerText ? secondNumber.innerText += e.key : firstNumber.innerText += e.key;
    }
    if (['+', '-', '*', '/', '%'].includes(e.key)) {
        let operate = e.key
        if (operate === '*') operate = 'x'
        console.log(operate)
        if (result.innerText) {
            firstNumber.innerText = isNaN(result.innerText.slice(1)) ? 0 : result.innerText.slice(1);
            operation.innerText = operate;
            secondNumber.innerText = '';
            result.innerText = '';
        }
        else if (firstNumber.innerText && !secondNumber.innerText) {
            operation.innerText = operate;
        }
    }
    if (e.key === '.') {
        if (operation.innerText) {
            secondNumber.innerText.includes('.') || !secondNumber.innerText ? null : secondNumber.innerText += '.';
        }
        else {
            firstNumber.innerText.includes('.') || !firstNumber.innerText ? null : firstNumber.innerText += '.';
        }
    }
    if (e.key === '!') {
        if (result.innerText) return;
        if (operation.innerText) {
            secondNumber.innerText.includes('-') ? secondNumber.innerText = secondNumber.innerText.slice(1) : secondNumber.innerText = '-' + secondNumber.innerText;
        }
        else {
            firstNumber.innerText.includes('-') ? firstNumber.innerText = firstNumber.innerText.slice(1) : firstNumber.innerText = '-' + firstNumber.innerText;
        }
    }
    if (e.key === '=' || e.key === 'Enter') {
        const num1 = Number(firstNumber.innerText);
        const num2 = Number(secondNumber.innerText);
        const operate = operation.innerText;

        if (operate === '+') {
            result.innerText = '= ' + addNumber(num1, num2);
        }
        if (operate === '-') {
            result.innerText = '= ' + subtractNumber(num1, num2);
        }
        if (operate === 'x') {
            result.innerText = '= ' + multiplyNumber(num1, num2);
        }
        if (operate === '/') {
            result.innerText = '= ' + divideNumber(num1, num2);
        }
        if (operate === '%') {
            result.innerText = '= ' + modularNumber(num1, num2);
        }
    }
    if (e.key === 'Backspace') {
        if (secondNumber.innerText) {
            secondNumber.innerText = secondNumber.innerText.slice(0, -1);
        }
        else if (operation.innerText) {
            operation.innerText = operation.innerText.slice(0, -1);
        }
        else if (firstNumber.innerText) {
            firstNumber.innerText = firstNumber.innerText.slice(0, -1);
        }
        result.innerText = '';
    }
    if (e.key === 'Backspace' && e.shiftKey === true) clear();
});