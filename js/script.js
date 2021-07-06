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
    //if key is a number or decimal
    if (!action) {
        if (input.length < 23) { //limits numbers in display
            previousKey = 'number';
            input += buttonValue;
            console.log(input, 'input');
            display.text(input);
            storedOperator = operator; //saves previous 'operator' for calculations
            console.log(storedOperator, 'storedOperator');
            //Allows only ONE decimal point
            if (display.text().includes('.')) {
                $('#decimal').prop('disabled', true);
            } else {
                $('#decimal').prop('disabled', false);
            }
        }
    }
    //if key is an operator (+-*/):
    if (action) {
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
    numberSet1 = '';
    numberSet2 = '';
    operator = '';
    storedOperator = '';
    previousKey = '';
    calculate = '';
    input = '';
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


let styles = [
    {
        "main-background"       : "hsl(222, 26%, 31%)",
        "tog-key-background"    : "hsl(223, 31%, 20%)",
        "screen-background"     : "hsl(224, 36%, 15%)",
        "key-background-a"      : "hsl(225, 21%, 49%)",
        "key-shadow-a"          : "hsl(224, 28%, 35%)",
        "key-background-b"      : "hsl(25, 98%, 40%)",
        "key-shadow-b"          : "hsl(6, 70%, 34%)",
        "key-background-c"      : "hsl(30, 25%, 89%)",
        "key-shadow-c"          : "hsl(28, 16%, 65%)",
        "text"                  : "hsl(221, 14%, 31%)",
    },
    {
        "main-background"       : "hsl(0, 0%, 90%)",
        "tog-key-background"    : "hsl(0, 5%, 81%)",
        "screen-background"     : "hsl(0, 0%, 93%)",
        "key-background-a"      : "hsl(185, 42%, 37%)",
        "key-shadow-a"          : "hsl(185, 58%, 25%)",
        "key-background-b"      : "hsl(25, 98%, 40%)",
        "key-shadow-b"          : "hsl(25, 99%, 27%)",
        "key-background-c"      : "hsl(45, 7%, 89%)",
        "key-shadow-c"          : "hsl(35, 11%, 61%)",
        "text"                  : "hsl(60, 10%, 19%)"
    },
    {
        "main-background"       : "hsl(268, 75%, 9%)",
        "tog-key-background"    : "hsl(268, 71%, 12%)",
        "screen-background"     : "hsl(268, 71%, 12%)",
        "key-background-a"      : "hsl(281, 89%, 26%)",
        "key-shadow-a"          : "hsl(285, 91%, 52%)",
        "key-background-b"      : "hsl(176, 100%, 44%)",
        "key-shadow-b"          : "hsl(177, 92%, 70%)",
        "key-background-c"      : "hsl(268, 47%, 21%)",
        "key-shadow-c"          : "hsl(290, 70%, 36%)",
        "text"                  : "hsl(52, 100%, 62%)"
    }
]

//Theme Slider
$('.slider').on('change', function(){
    console.log(this.value);
});


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