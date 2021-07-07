const display = $('.calc__body-display');
let input = '';
let numberSet1 = '';
let numberSet2 = '';
let operator = '';
let storedOperator = '';
let previousKey = '';
let calculate = '';

// When key is pressed:
$('.calc__body-keys-button').click(function() {
    console.log('click');
    const buttonValue = $(this).val();
    const action = $(this).data('action');
    //if key is NOT an operator
    if (!action) {
        if (input.length < 23) { //limits numbers in display
            previousKey = 'number';
            input += buttonValue;
            console.log(input, 'input');
            display.text(input);
            storedOperator = operator; //saves previous operator for calculations
            console.log(storedOperator, 'storedOperator');
            //Allows only ONE decimal point
            if (display.text().includes('.')) {
                $('#decimal').prop('disabled', true);
            } else {
                $('#decimal').prop('disabled', false);
            }
        }
    } else {
        if (previousKey === 'number') {
            operator = action;
            console.log(operator, 'operator');
            previousKey = 'operator';
            console.log(previousKey, 'previousKey');
            //On FIRST operator key press: input is parsed as 'numberSet1'
            if (numberSet1 === '') {
                numberSet1 = parseFloat(input);
                input = '';
                console.log(numberSet1, 'numberSet1');
            //On additional operator key presses: input is parsed as 'numberSet2'
            } else {
                numberSet2 = parseFloat(input);
                input = '';
                console.log(numberSet2, 'numberSet2');
                //Calculate 'numberSet1' and 'numberSet2' and store as 'calculate' for further use. Display 'calculate'.
                if (storedOperator === 'add') {
                    calculate = add(numberSet1, numberSet2);
                } else if (storedOperator === 'subtract') {
                    calculate = subtract(numberSet1, numberSet2);
                } else if (storedOperator === 'multiply') {
                    calculate = multiply(numberSet1, numberSet2);
                } else if (storedOperator === 'divide') {
                    calculate = divide(numberSet1, numberSet2);
                }
                console.log(calculate, 'calculate');
                display.text(calculate);
                numberSet1 = calculate;
            }
        } else {
            operator = action;
        }
    }
});

//Decimal button
$('#decimal').click(function(){
    if (display.text() === '.') {
        input = '0.'; //adds zero to display if decimal has no previous number
        display.text(input);
    }
});

//Equals button
$('#equals').click(function(){
    numberSet2 = parseFloat(input);
    console.log(numberSet2, 'numberSet2');
    if (operator === 'add') {
        display.text(add(numberSet1, numberSet2));
    } else if (operator === 'subtract') {
        display.text(subtract(numberSet1, numberSet2));
    } else if (operator === 'multiply') {
        display.text(multiply(numberSet1, numberSet2));
    } else if (operator === 'divide') {
        display.text(divide(numberSet1, numberSet2));
    }
    input = display.text();
    previousKey = 'number';
    numberSet1 = '';
    numberSet2 = '';
    operator = '';
    storedOperator = '';
    calculate = '';
}); 

// Reset button
$('#reset').click(function(){
    input = '';
    numberSet1 = '';
    numberSet2 = '';
    operator = '';
    storedOperator = '';
    previousKey = '';
    calculate = '';
    display.text('');
});

// Delete button
$('#delete').click(function(){
    input = input.slice(0, input.length-1);
    display.text(input);
    console.log(input, 'input')
});

//Theme Slider
$('.slider').on('change', function(){
    console.log(this.value);
    let number = this.value;
    console.log (number, 'number');
    for (let i = 1; i<=3; i++) {
        $('.desktop-container').removeClass(`theme-${i}`);
    }
    $('.desktop-container').addClass(`theme-${number}`);
    storeTheme(number);
});

// Gets saved themes on load
$(document).ready(function() {
    let num = getTheme();
    console.log(num, 'num')
    $('.desktop-container').addClass(`theme-${num}`)
    $('.slider').val(`${num}`);
})

// Local storage functions for Themes
function storeTheme(num) {
    localStorage.setItem('theme', num);
}
function getTheme() {
    return localStorage.getItem('theme');
}

//Mathematical functions
function add (num1, num2) {
    return num1 + num2;
}
function subtract (num1, num2) {
    return num1 - num2;
}
function divide (num1, num2) {
    return num1 / num2;
}
function multiply (num1, num2) {
    return num1 * num2;
}