let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

// Append numbers and decimals to display
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple leading zeros
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            // Prevent multiple decimal points
            if (num === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += num;
        }
    }
    updateDisplay();
}

// Append operators (+, −, ×, ÷)
function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }

    if (operator !== '' && currentInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

// Calculate the result
function calculate() {
    if (operator === '' || previousInput === '' || currentInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                display.value = 'Error';
                currentInput = '';
                previousInput = '';
                operator = '';
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Clear the display and reset all values
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Delete the last digit
function deleteLast() {
    if (currentInput !== '' && currentInput !== '0') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
    }
    updateDisplay();
}

// Update the display
function updateDisplay() {
    display.value = currentInput;
}

// Initialize display
updateDisplay();
