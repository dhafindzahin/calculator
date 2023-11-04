const calculation = document.getElementById('calculation');
const numberBtn = [...document.getElementsByClassName('numberBtn')];
const operationBtn = [...document.getElementsByClassName('operationBtn')];
const prefixBtn = document.getElementById('prefix');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.getElementById('clear');
const removeBtn = document.getElementById('remove');
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const operation = document.getElementById('operation');

numberBtn.forEach(element => {
    element.addEventListener('click', (e) => operation.innerText ? secondNumber.innerText += e.target.innerText : firstNumber.innerText += e.target.innerText);
});

prefixBtn.addEventListener('click', () => {
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
        if (firstNumber.innerText && !secondNumber.innerText) {
            operation.innerText = '';
            operation.innerText += e.target.innerText;
        }
    });
});

clearBtn.addEventListener('click', () => {
    firstNumber.innerText = '';
    secondNumber.innerText = '';
    operation.innerText = '';
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
});