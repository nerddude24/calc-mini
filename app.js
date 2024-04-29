const DECIMAL_ROUNDING = 6;
const displayElement = document.querySelector("#display-txt");
const numButtons = document.querySelectorAll(".num-btn");
const equalsButton = document.querySelector(".eq-btn");
const clearButton = document.querySelector(".ac-btn");
const operationButtons = document.querySelectorAll(".op-btn");

let firstNum = NaN;
let secondNum = NaN;
let operator = "";
let displayValue = "";
let waitingForSecondNum = false;

function add(a, b) {
	return a + b;
}

function sub(a, b) {
	return a - b;
}

function mul(a, b) {
	return a * b;
}

function div(a, b) {
	return a / b;
}

function operate(a, b, op) {
	let result = NaN;
	switch (op) {
		case "+":
			result = add(a, b);
			break;
		case "-":
			result = sub(a, b);
			break;
		case "*":
			result = mul(a, b);
			break;
		case "/":
			if (b === 0) {
				alert("You can't divide by zero!");
				return NaN;
			}
			result = div(a, b);
			break;
		default:
			console.error("UNKNOWN OPERATOR: (" + op + ")");
			return NaN;
	}

	// This rounds the result
	if (result != NaN)
		result =
			Math.floor(result * Math.pow(10, DECIMAL_ROUNDING)) /
			Math.pow(10, DECIMAL_ROUNDING);

	return result;
}

function isDisplayANumber() {
	const num = parseFloat(displayValue);

	return num !== NaN;
}

// This clears the display only
function clearDisplay() {
	displayValue = "";
	displayElement.textContent = displayValue;
}

// This clears everything
function clearCalculator() {
	clearDisplay();
	firstNum = NaN;
	secondNum = NaN;
	operator = "";
}

function populateDisplay(str) {
	if (!isDisplayANumber) clearDisplay();
	displayValue += str;
	displayElement.textContent = displayValue;
}

function calculate() {
	if (displayValue === "") return;
	if (!waitingForSecondNum) return;

	secondNum = parseFloat(displayValue);
	const result = operate(firstNum, secondNum, operator);
	if (result === NaN) {
		clearCalculator();
		return;
	}
	displayValue = result.toString();
	displayElement.textContent = displayValue;
	operator = "";
	waitingForSecondNum = false;
}

// triggers on clicking an operator button
function processInput(op) {
	// If the input is empty just return
	if (displayValue === "") return;

	if (waitingForSecondNum) {
		calculate();
		return;
	}

	firstNum = parseFloat(displayValue);
	operator = op;
	waitingForSecondNum = true;
	clearDisplay();
}

function addButtonEvents() {
	numButtons.forEach((element) => {
		element.addEventListener("click", (_) => {
			// Add the num that's written inside the button to the display
			populateDisplay(element.textContent);
		});
	});

	operationButtons.forEach((element) => {
		element.addEventListener("click", (_) => {
			processInput(element.textContent);
		});
	});

	clearButton.addEventListener("click", clearCalculator);

	equalsButton.addEventListener("click", calculate);
}

addButtonEvents();
clearCalculator();
