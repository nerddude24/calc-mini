const DECIMAL_ROUNDING = 6;

/*  DOM Element constants  */
const displayElement = document.querySelector("#display-txt");
const numButtons = document.querySelectorAll(".num-btn");
const equalsButton = document.querySelector(".eq-btn");
const clearButton = document.querySelector(".ac-btn");
const operationButtons = document.querySelectorAll(".op-btn");
/*-------------------------*/

let firstNum = NaN;
let secondNum = NaN;
let operator = "";
let displayValue = "";
let waitingForSecondNum = false;

/* The four basic mathematical functions */
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
/* ------------------------- */

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

	// Round the result if it's a number, It has no effect if the number is an integer.
	if (result != NaN)
		result =
			Math.floor(result * Math.pow(10, DECIMAL_ROUNDING)) /
			Math.pow(10, DECIMAL_ROUNDING);

	return result;
}

// This is Basically the opposite of isNaN, and it also works with strings and numbers.
function isNumber(val) {
	return !isNaN(parseFloat(val.toString()));
}

// Update the display to the passed string.
function updateDisplay(str) {
	displayValue = str;
	displayElement.textContent = displayValue;
}

// This only clears the display.
function clearDisplay() {
	updateDisplay("");
}

// This clears and resets everything.
function clearCalculator() {
	clearDisplay();
	firstNum = NaN;
	secondNum = NaN;
	operator = "";
	waitingForSecondNum = false;
}

// Used by number buttons.
function populateDisplay(str) {
	// if the display is NaN, clear the display so that it only contains numbers.
	if (!isNumber(displayElement.textContent)) clearDisplay();

	// if the input is a floating point and there is already one on the display, return.
	if (str === "." && displayValue.includes(".")) return;

	// add the number that's written in the button to the display.
	updateDisplay(displayValue + str);
}

function calculate() {
	if (displayValue === "") return;
	if (!waitingForSecondNum) return;

	secondNum = parseFloat(displayValue);
	const result = operate(firstNum, secondNum, operator);
	clearCalculator();
	updateDisplay(result.toString());

	// set the first number to the result so that the user can operate on it,
	// if result is NaN then the first number will also be NaN, just like it was
	// at the start of the application.
	firstNum = result;
}

// triggers on clicking an operator button
function processInput(op) {
	// If the input is empty just return
	if (displayValue === "") return;

	if (waitingForSecondNum) {
		calculate();
		return;
	}

	// we don't have the first number so we store it and the operator
	firstNum = parseFloat(displayValue);
	operator = op;

	// we clear the display and wait for second input
	clearDisplay();
	waitingForSecondNum = true;
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
			// The operator is the text content of the button (for example "+")
			// This should be fine unless the client changes the html of the page,
			// but even if he does then the operator will be changed to another one or it will error.
			processInput(element.textContent);
		});
	});

	clearButton.addEventListener("click", clearCalculator);

	equalsButton.addEventListener("click", calculate);
}

addButtonEvents();
clearCalculator();
