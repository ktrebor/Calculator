const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearButton = document.querySelector('[data-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const pointButton = document.querySelector('[data-decimal]');

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

function add(a, b) {
    return a + b;
  }
  
function substract(a, b) {
    return a - b;
  }
  
function multiply(a, b) {
    return a * b;
  }
  
function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
  }
}

//event listener for digit buttons and append everytime a user press a digit
numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)
 
function appendNumber(number) {
  if (currentOperand.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperand.textContent += number  
}

function resetScreen() {
  currentOperand.textContent = ''
  shouldResetScreen = false
}

//event listener to all clear and  add 0 to current-operand and empty string to previous-operand
allClearButton.addEventListener('click', allclear);
function allclear() {
  currentOperand.textContent = '0'
  previousOperand.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

//event listener to clear => removes the last element from the new string
clearButton.addEventListener('click', clear);
function clear() {
  currentOperand.textContent = currentOperand.textContent
  .toString()
  .slice(0, -1)
}


//event listener to pointbutton => adds a single point to the string
pointButton.addEventListener('click', appendPoint);
function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperand.textContent === '')
    currentOperand.textContent = '0'
  if (currentOperand.textContent.includes('.')) return
  currentOperand.textContent += '.'
}

//event listener to all opperands
operationButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperand.textContent
  currentOperation = operator
  previousOperand.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

//event listener to equals
equalsButton.addEventListener('click', evaluate);

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperand.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperand.textContent
  currentOperand.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  previousOperand.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}
