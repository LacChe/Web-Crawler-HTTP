import React from 'react'

const closure3 = () => {
    
    var calc = calculator();

    function calculator() {

        var state = 0;
        var currentNum = '';
        var currentOperator = '';

        return function process(key) {
            if(isNaN(key)) {
                switch(currentOperator) {
                    case '+':
                        console.log(Number(state) + Number(currentNum))
                        state = (Number(state) + Number(currentNum)).toString()
                        break;
                    case '-':
                        state = (Number(state) - Number(currentNum)).toString()
                        break;
                    case '*':
                        state = (Number(state) * Number(currentNum)).toString()
                       break;
                    case '/':
                        state = (Number(state) / Number(currentNum)).toString()
                        break;
                    default:
                        state = (Number(state) + Number(currentNum)).toString()
                        break;
                }
                currentNum = 0;
                currentOperator = key;
            } else {
                if(currentOperator === '=') {
                    state = 0;
                    currentNum = '';
                    currentOperator = '';
                }
                currentNum += key.toString();
            }

            return key === '=' ? formatTotal(Number(state)) : key;
        }
    }
  
    function calcHelper(calc,keys) {
        return [...keys].reduce(
            function showDisplay(display,key){
                var ret = String( calc(key) );
                return (
                    display +
                    (
                      (ret !== "" && key === "=") ?
                          "=" :
                          ""
                    ) +
                    ret
                );
            },
            ""
        );
    }

    function formatTotal(display) {
        if (Number.isFinite(display)) {
            // constrain display to max 11 chars
            let maxDigits = 11;
            // reserve space for "e+" notation?
            if (Math.abs(display) > 99999999999) {
                maxDigits -= 6;
            }
            // reserve space for "-"?
            if (display < 0) {
                maxDigits--;
            }
    
            // whole number?
            if (Number.isInteger(display)) {
                display = display
                    .toPrecision(maxDigits)
                    .replace(/\.0+$/,"");
            }
            // decimal
            else {
                // reserve space for "."
                maxDigits--;
                // reserve space for leading "0"?
                if (
                    Math.abs(display) >= 0 &&
                    Math.abs(display) < 1
                ) {
                    maxDigits--;
                }
                display = display
                    .toPrecision(maxDigits)
                    .replace(/0+$/,"");
            }
        }
        else {
            display = "ERR";
        }
        return display;
    }
  
  return (
    <>
      <h3>Closure3</h3>
      <ul>
        <li>{calcHelper(calc,"4+3=")}</li>
        <li>{calcHelper(calc,"+9=")}</li>
        <li>{calcHelper(calc,"*8=")}</li>
        <li>{calcHelper(calc,"7*2*3=")}</li>
        <li>{calcHelper(calc,"1/0=")}</li>
        <li>{calcHelper(calc,"+3=")}</li>
        <li>{calcHelper(calc,"51=")}</li>
      </ul>
    </>
  )
}

export default closure3