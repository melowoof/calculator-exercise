let firstNum = "";
let secondNum = "";
let operator = "";
let operatorSign = "";
let currentInput = "first";
let dotValue = false;
const monitor = document.querySelector("#monitor");
const numpad = document.querySelector("#numpad");

numpad.addEventListener("click", function (event) {
  let target = event.target;

  switch (target.id) {
    case "enter":
      operateAndDisplay(firstNum, secondNum, operator);
      break;

    case "backspace":
      backspace();
      break;

    case "negative":
      negative();
      break;

    case "percent":
      percent();
      break;

    case "clear":
      clear();
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
      dot();
      break;

    // default:
    //   console.log("default");
  }
});

function backspace() {
  if (secondNum) {
    if (secondNum.slice(-1) === ".") {
      dotValue = false;
      secondNum = secondNum.slice(0, -1);
      writeToInput();
    } else {
      secondNum = secondNum.slice(0, -1);
      writeToInput();
    }
  } else if (operator && !secondNum) {
    operator = "";
    operatorSign = "";
    currentInput = "first";
    writeToInput();
  } else {
    if (firstNum.slice(-1) === ".") {
      dotValue = false;
      firstNum = firstNum.slice(0, -1);
      writeToInput();
    } else {
      firstNum = firstNum.slice(0, -1);
      writeToInput();
    }
  }
}

function resetValues() {
  firstNum = "";
  secondNum = "";
  operator = "";
  operatorSign = "";
  currentInput = "first";
  dotValue = false;
}

function negative() {
  if (firstNum || secondNum) {
    if (currentInput === "first") {
      firstNum = -firstNum;
      writeToInput();
    } else {
      if (secondNum) {
        secondNum = -secondNum;
        writeToInput();
      }
    }
  }
}

function dot() {
  if ((firstNum || secondNum) && !dotValue) {
    if (currentInput === "first") {
      dotValue = true;
      inputNumber(".");
    } else {
      if (!secondNum) {
        dotValue = true;
        inputNumber("0.");
      } else {
        dotValue = true;
        inputNumber(".");
      }
    }
  }
}

function percent() {
  if (firstNum && !secondNum && !operator) {
    operateAndDisplay(firstNum, 100, "divide");
  } else if (!firstNum) {
    const lastNode = monitor.querySelector("li.output:last-child");
    if (lastNode) {
      firstNum = lastNode.textContent;
      percent();
    }
  }
}

function clear() {
  while (monitor.firstChild) {
    monitor.removeChild(monitor.firstChild);
  }
  resetValues();
}

function operateAndDisplay(a, b, op) {
  if (a && b && op) {
    const result = operate(a, b, op);

    writeToOutput(roundNum(result));
  }
}

function roundNum(input) {
  if (Number.isInteger(input)) {
    return input;
  } else {
    return input.toFixed(7).replace(/\.?0+$/, "");
  }
}

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
  dotValue = false;

  switch (operator) {
    case "add":
      operatorSign = " + ";
      break;

    case "subtract":
      operatorSign = " − ";
      break;

    case "multiply":
      operatorSign = " × ";
      break;

    case "divide":
      operatorSign = " ÷ ";
      break;

    // default:
    // break;
  }
  writeToInput();
}

function inputNumber(input) {
  if (currentInput === "first") {
    firstNum += input;
    updateDisplay();
  } else {
    secondNum += input;
    updateDisplay();
  }
}

function updateDisplay() {
  const lastNode = monitor.querySelector("li:last-child");

  if (!lastNode) {
    const li = document.createElement("li");

    li.classList.add("input");

    monitor.appendChild(li);
    writeToInput();
  } else if (lastNode.classList.contains("output")) {
    const li = document.createElement("li");

    li.classList.add("input");

    monitor.appendChild(li);
    writeToInput();
  } else if (lastNode.classList.contains("input")) {
    writeToInput();
  }
}

function writeToOutput(output) {
  const outputNode = document.createElement("li");
  outputNode.classList.add("output");
  outputNode.textContent = output;
  monitor.appendChild(outputNode);
  while (monitor.childElementCount > 15) {
    monitor.removeChild(monitor.children[0]);
  }
}

function writeToInput() {
  const inputNode = monitor.querySelector("li.input:last-child");
  // inputNode.textContent += input;
  inputNode.textContent = `${firstNum} ${operatorSign} ${secondNum}`;

  while (monitor.childElementCount > 15) {
    monitor.removeChild(monitor.children[0]);
  }
  // console.log(`${firstNum} ${operator} ${secondNum}`);
}

function operate(a, b, op) {
  resetValues();

  a = parseFloat(a);
  b = parseFloat(b);

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
