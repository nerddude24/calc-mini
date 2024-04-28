const displayElement = document.querySelector("#display-txt");

let firstNum;
let secondNum;
let operator;
let displayValue = "";

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
	switch (op) {
		case "+":
			return add(a, b);
		case "-":
			return sub(a, b);
		case "*":
			return mul(a, b);
		case "/":
			return div(a, b);
		default:
			console.error("UNKNOWN OPERATOR: (" + op + ")");
			return NaN;
	}
}

function clearDisplay() {
	displayValue = "";
	displayElement.textContent = displayValue;
}

function populateDisplay(str) {
	displayValue += str;
	displayElement.textContent = displayValue;
}

const numButtons = document.querySelectorAll(".num-btn");

numButtons.forEach((element) => {
	element.addEventListener("click", (event) => {
		// Add the num that's written inside the button to the display
		populateDisplay(element.textContent);
	});
});

const clearButton = document.querySelector(".ac-btn");
clearButton.addEventListener("click", clearDisplay);

clearDisplay();
