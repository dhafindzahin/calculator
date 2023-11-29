// Declaration
const calculation = document.getElementById("calculation");
const numberBtn = [...document.getElementsByClassName("numberBtn")];
const operationBtn = [...document.getElementsByClassName("operationBtn")];
const prefixBtn = document.getElementById("prefix");
const decimalBtn = document.getElementById("decimal");
const equalBtn = document.getElementById("equal");
const removeBtn = document.getElementById("remove");
const clearBtn = document.getElementById("clear");
const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");
const operation = document.getElementById("operation");
const result = document.getElementById("result");
const themeBtn = document.getElementById("themeBtn");
const themeBtnPath = themeBtn.querySelector("path");
const body = document.getElementById("body");
const githubWhite = document.getElementById("github-white");
const githubDark = document.getElementById("github-dark");

// Theme Setup
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  body.classList.add("dark");
  githubDark.classList.add("hidden");
}

body.classList.contains("dark")
  ? themeBtnPath.setAttribute("fill", "white")
  : themeBtnPath.setAttribute("fill", "dark");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeBtnPath.setAttribute("fill", "white");
    githubDark.classList.add("hidden");
    githubWhite.classList.remove("hidden");
  } else {
    themeBtnPath.setAttribute("fill", "dark");
    githubWhite.classList.add("hidden");
    githubDark.classList.remove("hidden");
  }
});

// Calculator Functions

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
  if (b === 0) return "lmao";
  return a / b;
}

function modularNumber(a, b) {
  return a % b;
}

function remove() {
  if (secondNumber.innerText) {
    secondNumber.innerText = secondNumber.innerText.slice(0, -1);
  } else if (operation.innerText) {
    operation.innerText = operation.innerText.slice(0, -1);
  } else if (firstNumber.innerText) {
    firstNumber.innerText = firstNumber.innerText.slice(0, -1);
  }
  result.innerText = "";
}

function clear() {
  firstNumber.innerText = "";
  secondNumber.innerText = "";
  operation.innerText = "";
  result.innerText = "";
}

// Buttons Listener

numberBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (result.innerText) clear();
    operation.innerText
      ? (secondNumber.innerText += e.target.innerText)
      : (firstNumber.innerText += e.target.innerText);
  });
});

prefixBtn.addEventListener("click", () => {
  if (result.innerText) return;
  if (operation.innerText) {
    secondNumber.innerText.includes("-")
      ? (secondNumber.innerText = secondNumber.innerText.slice(1))
      : (secondNumber.innerText = "-" + secondNumber.innerText);
  } else {
    firstNumber.innerText.includes("-")
      ? (firstNumber.innerText = firstNumber.innerText.slice(1))
      : (firstNumber.innerText = "-" + firstNumber.innerText);
  }
});

decimalBtn.addEventListener("click", () => {
  if (result.innerText) return;
  if (operation.innerText) {
    secondNumber.innerText.includes(".") || !secondNumber.innerText
      ? null
      : (secondNumber.innerText += ".");
  } else {
    firstNumber.innerText.includes(".") || !firstNumber.innerText
      ? null
      : (firstNumber.innerText += ".");
  }
});

operationBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (result.innerText) {
      firstNumber.innerText = isNaN(result.innerText.slice(1))
        ? 0
        : result.innerText.slice(1);
      operation.innerText = e.target.innerText;
      secondNumber.innerText = "";
      result.innerText = "";
    } else if (firstNumber.innerText && !secondNumber.innerText) {
      operation.innerText = e.target.innerText;
    }
  });
});

equalBtn.addEventListener("click", () => {
  if (!secondNumber.innerText) return;
  const num1 = Number(firstNumber.innerText);
  const num2 = Number(secondNumber.innerText);
  const operate = operation.innerText;

  if (operate === "+") {
    result.innerText = "= " + addNumber(num1, num2);
  }
  if (operate === "-") {
    result.innerText = "= " + subtractNumber(num1, num2);
  }
  if (operate === "x") {
    result.innerText = "= " + multiplyNumber(num1, num2);
  }
  if (operate === "/") {
    result.innerText = "= " + divideNumber(num1, num2);
  }
  if (operate === "%") {
    result.innerText = "= " + modularNumber(num1, num2);
  }
});

removeBtn.addEventListener("click", () => remove());

clearBtn.addEventListener("click", () => clear());

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    if (result.innerText) clear();
    operation.innerText
      ? (secondNumber.innerText += e.key)
      : (firstNumber.innerText += e.key);
  }
  if (["+", "-", "*", "/", "%"].includes(e.key)) {
    let operate = e.key;
    if (operate === "*") operate = "x";
    console.log(operate);
    if (result.innerText) {
      firstNumber.innerText = isNaN(result.innerText.slice(1))
        ? 0
        : result.innerText.slice(1);
      operation.innerText = operate;
      secondNumber.innerText = "";
      result.innerText = "";
    } else if (firstNumber.innerText && !secondNumber.innerText) {
      operation.innerText = operate;
    }
  }
  if (e.key === ".") {
    if (result.innerText) return;
    if (operation.innerText) {
      secondNumber.innerText.includes(".") || !secondNumber.innerText
        ? null
        : (secondNumber.innerText += ".");
    } else {
      firstNumber.innerText.includes(".") || !firstNumber.innerText
        ? null
        : (firstNumber.innerText += ".");
    }
  }
  if (e.key === "!") {
    if (result.innerText) return;
    if (operation.innerText) {
      secondNumber.innerText.includes("-")
        ? (secondNumber.innerText = secondNumber.innerText.slice(1))
        : (secondNumber.innerText = "-" + secondNumber.innerText);
    } else {
      firstNumber.innerText.includes("-")
        ? (firstNumber.innerText = firstNumber.innerText.slice(1))
        : (firstNumber.innerText = "-" + firstNumber.innerText);
    }
  }
  if ((e.key === "=" || e.key === "Enter") && secondNumber.innerText) {
    const num1 = Number(firstNumber.innerText);
    const num2 = Number(secondNumber.innerText);
    const operate = operation.innerText;

    if (operate === "+") {
      result.innerText = "= " + addNumber(num1, num2);
    }
    if (operate === "-") {
      result.innerText = "= " + subtractNumber(num1, num2);
    }
    if (operate === "x") {
      result.innerText = "= " + multiplyNumber(num1, num2);
    }
    if (operate === "/") {
      result.innerText = "= " + divideNumber(num1, num2);
    }
    if (operate === "%") {
      result.innerText = "= " + modularNumber(num1, num2);
    }
  }
  if (e.key === "Backspace") remove();
  if (e.key === "Backspace" && e.shiftKey === true) clear();
});
