let firstNum;
let secondNum;
let operator;
const monitor = document.querySelector("#monitor");

function display() {}

function operate(firstNum, secondNum, operator) {
  switch (operator) {
    case "add":
      return add(firstNum, secondNum);

    case "subtract":
      return subtract(firstNum, secondNum);

    case "multiply":
      return multiply(firstNum, secondNum);

    case "divide":
      return divide(firstNum, secondNum);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
