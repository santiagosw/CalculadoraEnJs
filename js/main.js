let allowOperator = false;
let nextInputClears = false;
let currentInput = "";
let inputArray = [];
let buttons = document.getElementsByTagName("button");
let numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
let bgColorMem;

/* Operadores */
let operators = {
  "+" : function(a, b) { return a + b },
  "-" : function(a, b) { return a - b},
  "x" : function(a, b) { return a * b},
  "\u00f7" /*Division*/ : function(a, b) { 
    if (b != 0) {
      return a / b
    }
    allowOperator = false;
    nextNumClears = true;
    return "undefined";
  } 
}

function setHTML(element, html) {
  document.getElementById(element).innerHTML = html;
}


function updateDisplay() {
  setHTML("display", inputArray.join(" ") + " " + currentInput);
}

 /*  18 digitos maximo */
function appendNum(num) {
  let numTooLong = false;
  if (currentInput.length >= 18) {
    numTooLong = true;
  }
  if (currentInput == "" && inputArray.length > 0 && allowOperator === true) {
    currentInput = inputArray.pop();
    currentInput += num;
  } else if (numTooLong === false) {
    currentInput += num;
  }
  
}

function appendOperator(sym) {
  if (currentInput != "") {
    inputArray.push(currentInput);
  }
  inputArray.push(sym);
  currentInput = "";
  allowOperator = false;
}

function appendDot() {
  if (currentInput.indexOf(".") == -1) {
    currentInput += ".";
  } 
}

function appendPosNeg() {
    if (Number.isInteger(parseInt(currentInput[0]))) {
      currentInput = "-" + currentInput;
    } else if (currentInput[0] == "-") {
      currentInput = currentInput.substr(1, currentInput.length);
    }
}

function deleteInput() {
  let removedVal;
  function deleteVal() {
    removedVal = currentInput[currentInput.length - 1];
    currentInput = currentInput.substr(0, currentInput.length - 1);
  }
  if (currentInput != "") {
    deleteVal();
  } else if (currentInput == "" && inputArray.length > 0) {
    currentInput = inputArray.pop();
    deleteVal();
  }
  if (operators.hasOwnProperty(removedVal)) {
    allowOperator = true;
  }
}

function finalizeInputArray() {

  if (currentInput != "") {
    inputArray.push(currentInput);
    currentInput = "";
  }

  if (operators.hasOwnProperty(inputArray[inputArray.length - 1])) {
    inputArray.pop();
    allowOperator = true;
  }

  for (var i = 0; i < inputArray.length; i++) {
    if (!isNaN(parseFloat(inputArray[i]))) {
      inputArray[i] = parseFloat(inputArray[i]);
    }
  }
  console.log(inputArray);
}

function calcWith(op1, op2) {

  let op1Index;
  let op2Index;
  let indexToUse;
  let operator;
  let indexBefore;
  let indexAfter;
  let elemBefore;
  let elemAfter;
  

  function initVars() {
    op1Index = inputArray.indexOf(op1);
    op2Index = inputArray.indexOf(op2);
    switch(true) {
      case(op1Index == -1 && op2Index == -1):
        indexToUse = -1;
        break;
      case(op1Index == -1 && op2Index != -1):
        indexToUse = op2Index;
        operator = op2;
        break;
      case(op2Index == -1 && op1Index != -1):
        indexToUse = op1Index;
        operator = op1;
        break;
      case(op2Index < op1Index):
        indexToUse = op2Index;
        operator = op2;
        break;
      case(op1Index < op2Index):
        indexToUse = op1Index;
        operator = op1;
        break;
      }
    indexBefore = indexToUse - 1;
    indexAfter = indexToUse + 1;
    elemBefore = inputArray[indexBefore];
    elemAfter = inputArray[indexAfter];
    
  }
  
  initVars();
  
  while (indexToUse != -1) {
    console.log("Calculando: " + elemBefore + operator + elemAfter);
    inputArray[indexToUse] = operators[operator](elemBefore, elemAfter);
    inputArray.splice(indexAfter, 1);
    inputArray.splice(indexBefore, 1);
    console.log("Resultado: " + inputArray);
    initVars();
  }
}

function finalizeOutput() {
  currentInput = inputArray[0].toString();
  inputArray.length = 0;
}

function buttonPressed(userInput) {
  
  if (nextInputClears === true && numbers.includes(userInput)) {
    currentInput = "";
    inputArray.length = 0;
    nextInputClears = false;
  }
  
  switch(true) {

    case(numbers.includes(userInput)):
      appendNum(userInput);
      allowOperator = true;
      break;

    case(operators.hasOwnProperty(userInput) && allowOperator):
      appendOperator(userInput);
      nextInputClears = false;
      break;
    case(userInput == "."):

      appendDot();
      break;
    case(userInput == "+/-"):
      appendPosNeg();
      break;
    case(userInput == "C"):
      currentInput = "";
      inputArray = [];
      break;
    case(userInput == "DEL"):
      deleteInput();
      break;
  
    case(userInput == "=" && inputArray.length > 0):
      finalizeInputArray();
      calcWith("x", "\u00f7");
      calcWith("+", "-");
      finalizeOutput();
      nextInputClears = true;
      break;
  }
  updateDisplay();
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function(){
    let userInput = this.innerHTML;
    buttonPressed(userInput);
  });
}

function toggleKeyColor(key, action) {
  let theButton;
  let bgColor = "#74f790";
  switch(key) {
    case("1"):
      theButton = "btn-one";
      break;
    case("2"):
      theButton = "btn-two";
      break;
    case("3"):
      theButton = "btn-three";
      break;
    case("4"):
      theButton = "btn-four";
      break;
    case("5"):
      theButton = "btn-five";
      break;
    case("6"):
      theButton = "btn-six";
      break;  
    case("7"):
      theButton = "btn-seven";
      break;
    case("8"):
      theButton = "btn-eight";
      break;
    case("9"):
      theButton = "btn-nine";
      break;
    case("0"):
      theButton = "btn-zero";
      break;
    case("Enter"):
      theButton = "btn-equals";
      bgColor = "#21f24f";
      break;
    case("Backspace"):
      theButton = "btn-del";
      break;
    case("-"):
      theButton = "btn-minus";
      break;
    case("+"):
      theButton = "btn-plus";
      break;
    case("*"):
      theButton = "btn-times";
      break;
    case("/"):
      theButton = "btn-divide";
      break;
    case("."):
      theButton = "btn-dot";
      break;
  }
  let buttonID =  document.getElementById(theButton);
  if (action == "keydown") {
    if (bgColorMem.length === 0) {
      bgColorMem = buttonID.style.backgroundColor;
    }
    buttonID.style.backgroundColor = bgColor;
  }
  if (action == "keyup") {
    bgColorMem = "";
    buttonID.style.backgroundColor = bgColorMem;
  }
  
  
}

window.addEventListener("keydown", function(event){
  event.preventDefault();
  let userInput;
  switch(event.key){
    default:
      userInput = event.key;
      break;
    case("/"):
      userInput = "\u00f7";
      break;
    case("*"):
      userInput = "x";
      break;
    case("Enter"):
      userInput = "=";
      break;
    case("Backspace"):
      userInput = "DEL";
      break;
  }
  event.preventDefault();
  toggleKeyColor(event.key, "keydown");
  buttonPressed(userInput);
});

window.addEventListener("keyup", function(event){
  event.preventDefault();
  toggleKeyColor(event.key, "keyup");
  event.preventDefault();
});