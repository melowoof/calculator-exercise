let firstNum = "";
let secondNum = "";
let operator = "";
let currentInput = "first";
const monitor = document.querySelector("#monitor");
const numpad = document.querySelector("#numpad");

numpad.addEventListener("click", function (event) {
  let target = event.target;

  switch (target.id) {
    case "enter":
      break;

    case "clear":
      break;

    case "tab":
      break;

    case "percent":
      break;

    case "del":
      break;

    case "add":
      handleOperator("add");
      break;

    case "subtract":
      handleOperator("subtract");
      break;

    case "multiply":
      handleOperator("multiply");
      break;

    case "divide":
      handleOperator("divide");
      break;

    case "num0":
      inputNumber("0");
      break;

    case "num1":
      inputNumber("1");
      break;

    case "num2":
      inputNumber("2");
      break;

    case "num3":
      inputNumber("3");
      break;

    case "num4":
      inputNumber("4");
      break;

    case "num5":
      inputNumber("5");
      break;

    case "num6":
      inputNumber("6");
      break;

    case "num7":
      inputNumber("7");
      break;

    case "num8":
      inputNumber("8");
      break;

    case "num9":
      inputNumber("9");
      break;

    case "dot":
      break;

    // default:
    //   console.log("hi");
    //   display("2");
    //   break;
  }
});

function handleOperator(op) {
  const lastNode = monitor.querySelector("li:last-child");

  if (!lastNode) {
    return;
  } else if (lastNode.classList.contains("output")) {
    let li = document.createElement("li");
    firstNum = lastNode.textContent;
    li.textContent = firstNum;

    li.classList.add("input");

    monitor.appendChild(li);
  } else if (operator) {
    return;
  }

  operator = op;
  currentInput = "second";

  switch (op) {
    case "add":
      writeToInput(" + ");
      break;

    case "subtract":
      writeToInput(" − ");
      break;

    case "multiply":
      writeToInput(" × ");
      break;

    case "divide":
      writeToInput(" ÷ ");
      break;

    default:
      break;
  }
}

function inputNumber(input) {
  if (currentInput === "first") {
    firstNum += input;
    updateDisplay(input);
  } else {
    secondNum += input;
    updateDisplay(input);
  }
}

function updateDisplay(input) {
  const lastNode = monitor.querySelector("li:last-child");

  if (!lastNode) {
    let li = document.createElement("li");

    li.classList.add("input");

    monitor.appendChild(li);
    writeToInput(input);
  } else if (lastNode.classList.contains("output")) {
    let li = document.createElement("li");

    li.classList.add("input");

    monitor.appendChild(li);
    writeToInput(input);
  } else if (lastNode.classList.contains("input")) {
    writeToInput(input);
  }
}

// function display(input) {
//   const lastNode = monitor.querySelector("li:last-child");

//   if (lastNode.classList.contains("input")) {
//     writeToInput(input);
//   } else {
//     let li = document.createElement("li");
//     li.classList.add("input");
//     monitor.appendChild(li);
//     writeToInput(input);
//   }
// }

function writeToOutput(input) {
  const outputNode = monitor.querySelector("li.output:last-child");
  outputNode.textContent = input;
}

function writeToInput(input) {
  const inputNode = monitor.querySelector("li.input:last-child");
  inputNode.textContent += input;
  console.log(`${firstNum} ${operator} ${secondNum}`);
}

function operate(a, b, op) {
  operator = null;

  switch (op) {
    case "add":
      return add(a, b);

    case "subtract":
      return subtract(a, b);

    case "multiply":
      return multiply(a, b);

    case "divide":
      return divide(a, b);
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
