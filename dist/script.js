const { useState } = React; // Import useState from React


const Button = ({ updateValue, handleResult, clear }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "buttons" }, /*#__PURE__*/
    React.createElement("button", { id: "clear", value: "", onClick: clear }, " AC"), /*#__PURE__*/
    React.createElement("button", { id: "divide", onClick: () => updateValue('/') }, "/"), /*#__PURE__*/
    React.createElement("button", { id: "multiply", onClick: () => updateValue('x') }, " x"), /*#__PURE__*/


    React.createElement("button", { id: "seven", value: "7", onClick: () => updateValue('7') }, "7"), /*#__PURE__*/
    React.createElement("button", { id: "eight", onClick: () => updateValue('8') }, "8"), /*#__PURE__*/
    React.createElement("button", { id: "nine", onClick: () => updateValue('9') }, "9"), /*#__PURE__*/
    React.createElement("button", { id: "subtract", onClick: () => updateValue('-') }, "-"), /*#__PURE__*/


    React.createElement("button", { id: "four", onClick: () => updateValue('4') }, "4"), /*#__PURE__*/
    React.createElement("button", { id: "five", onClick: () => updateValue('5') }, "5"), /*#__PURE__*/
    React.createElement("button", { id: "six", onClick: () => updateValue('6') }, "6"), /*#__PURE__*/
    React.createElement("button", { id: "add", onClick: () => updateValue('+') }, "+"), /*#__PURE__*/


    React.createElement("button", { id: "one", onClick: () => updateValue('1') }, "1"), /*#__PURE__*/
    React.createElement("button", { id: "two", onClick: () => updateValue('2') }, "2"), /*#__PURE__*/
    React.createElement("button", { id: "three", onClick: () => updateValue('3') }, "3"), /*#__PURE__*/
    React.createElement("button", { id: "equals", onClick: handleResult }, "="), /*#__PURE__*/


    React.createElement("button", { id: "zero", onClick: () => updateValue('0') }, "0"), /*#__PURE__*/
    React.createElement("button", { id: "decimal", onClick: () => updateValue('.') }, ".")));



};

const Display = ({ expression, result }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("div", { id: "current-number" }, expression), /*#__PURE__*/
    React.createElement("div", { id: "result" }, result)));


};

const App = () => {

  const [expression, setExpression] = useState(""); // For the expression
  const [result, setResult] = useState(0); // For the result

  const updateValue = (value) =>
  {


    if (value === '0')
    {
      const lastChar = expression.slice(-1);
      // If the expression is empty or the last char is not a decimal, avoid multiple leading zeros
      if (expression === "0") {
        return; // Don't allow "00"
      }
    }


    //Handle condition if the previous expression was '='
    if (expression.includes('='))
    {
      //Condition if user press an operator
      //Expression will be replaced with prev result and current operator
      if (/[+x/]/.test(value)) {
        setExpression("");
        setExpression(result + value);
      }
      //Condition if user press a number
      //Expression will be replaced with current value
      else {
          setExpression(value);
        }
      //Clear results
      setResult(0); // Clear the previous result
      return;
    }



    if (value === ".")
    {
      if (expression === "" || expression.endsWith("+") || expression.endsWith("-") || expression.endsWith("/") || expression.endsWith("x"))
      {
        setExpression(prev => prev + "0."); // Add "0." if starting with a decimal after an operator
      } else
      if (!expression.split(/[-+x/]/).pop().includes("."))
      {
        setExpression(prev => prev + "."); // Allow only one decimal per number
      }
      return;
    }

    const lastChar = expression.slice(-1);

    // Handle consecutive operators (ignore consecutive except negative sign)
    if (/[+x/-]/.test(lastChar) && /[+x/]/.test(value))
    {
      // Replace last operator with the current one
      //eg, expressions = '5 +'
      // prev. slice returns, '5 '
      setExpression(prev => prev.slice(0, -1) + value);
      return;
    }

    // For other values, append them normally
    setExpression(prev => prev + value);
  };


  const handleResult = () =>
  {
    if (expression === "") return;
    try
    {
      // Replace 'x' with '*'

      const sanitizedExpression = expression.replace(/x/g, '*');
      let evalResult = eval(sanitizedExpression);
      evalResult = parseFloat(evalResult.toFixed(4));
      setResult(evalResult);
      setExpression(prev => prev + " = " + evalResult.toString());
    }
    catch (error)
    {
      setResult("Error");
    }
  };

  const clear = () => {
    setExpression(""); // Clear expression
    setResult(0); // Reset result to 0
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "calculator-body" }, /*#__PURE__*/
    React.createElement(Display, { expression: expression, result: result }), /*#__PURE__*/
    React.createElement(Button, { updateValue: updateValue, handleResult: handleResult, clear: clear })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));