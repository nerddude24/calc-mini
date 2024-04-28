const DECIMAL_ROUNDING = 6;
const displayElement = document.querySelector("#display-txt");

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
	if (displayValue === "NaN") clearDisplay();
	displayValue += str;
	displayElement.textContent = displayValue;
}

// triggers on operator button click
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

const numButtons = document.querySelectorAll(".num-btn");
numButtons.forEach((element) => {
	element.addEventListener("click", (_) => {
		// Add the num that's written inside the button to the display
		populateDisplay(element.textContent);
	});
});

const operationButtons = document.querySelectorAll(".op-btn");
operationButtons.forEach((element) => {
	element.addEventListener("click", (_) => {
		processInput(element.textContent);
	});
});

const clearButton = document.querySelector(".ac-btn");
clearButton.addEventListener("click", clearCalculator);

const equalsButton = document.querySelector(".eq-btn");
equalsButton.addEventListener("click", calculate);

clearCalculator();
