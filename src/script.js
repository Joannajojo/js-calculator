const { useState } = React; // Import useState from React

//Component to handle buttons
const Button = ({ updateValue, handleResult, clear }) => {
  //layout for buttons
  return (
      <div id="buttons">
            <button id="clear" value="" onClick={clear}> AC</button>
            <button id="divide" onClick={() => updateValue('/')}>/</button>
            <button id="multiply" onClick={() => updateValue('x')}> x</button>
        
        
            <button id="seven" value="7" onClick={() => updateValue('7')} >7</button>
            <button id="eight" onClick={() => updateValue('8')} >8</button>
            <button id="nine" onClick={() => updateValue('9')}>9</button>
            <button id="subtract" onClick={() => updateValue('-')}>-</button>
        
        
            <button id="four" onClick={() => updateValue('4')}>4</button>
            <button id="five" onClick={() => updateValue('5')}>5</button>
            <button id="six" onClick={() => updateValue('6')}>6</button>
            <button id="add" onClick={() => updateValue('+')}>+</button>
        
        
            <button id="one" onClick={() => updateValue('1')}>1</button>
            <button id="two" onClick={() => updateValue('2')}>2</button>
          <button id="three" onClick={() => updateValue('3')}>3</button>
          <button id="equals" onClick={handleResult}>=</button>
        
        
          <button id="zero" onClick={() => updateValue('0')}>0</button>
          <button id="decimal" onClick={() => updateValue('.')}>.</button>

      </div>
  );
}

//Component for Display
const Display = ({expression, result}) => {
  return (
    <div id="display">
      <div id="current-number">{expression}</div>
      <div id="result" >{result}</div>
    </div>
  );
}

//Main component
const App = () => {
 
  //States
  //To store input
  const [expression, setExpression] = useState(""); 
  
  //To store result
  const [result, setResult] = useState(0); 
  
  //Handle event when input clicking a button
  const updateValue = (value) => 
  {
    // If the expression is empty or the last char is not a decimal, avoid multiple leading zeros
    if (value === '0') 
    {
      const lastChar = expression.slice(-1);
      
      if (expression === "0") {
        return; // Don't allow "00"
      }
    }
    
   
    //Handle condition if the previous expression was '='
    if (expression.includes('=')) 
    {
      //Condition if user press an operator
      //Expression will be replaced with prev result and current operator
      if(/[+x/]/.test(value)){
        setExpression("");
        setExpression(result + value)
      }
      //Condition if user press a number
      //Expression will be replaced with current value
      else{
         setExpression(value);  
      }
      //Clear results
      setResult(0);  // Clear the previous result
      return;
    }
    
    
     if (value === ".") 
     {
       // Add "0." if starting with a decimal after an operator
        if (expression === "" || expression.endsWith("+") || expression.endsWith("-") || expression.endsWith("/") || expression.endsWith("x")) 
        {
          setExpression((prev) => prev + "0."); 
        } 
       // Allow only one decimal per number
       else if (!expression.split(/[-+x/]/).pop().includes(".")) 
       {
         setExpression((prev) => prev + ".");  
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
      setExpression((prev) => prev.slice(0, -1) + value);
      return;
    }
    
     // For other values, append them normally
    setExpression((prev) => prev + value);
 }
  
  //Handle results when user clicks '='
  const handleResult= () => 
  {
     if (expression === "") return; 
     try 
     {
      // Replace 'x' with '*'  
      const sanitizedExpression = expression.replace(/x/g, '*');
       //Perform calculation
      let evalResult = eval(sanitizedExpression);
       //Keep result rounded to 4 dec places
      evalResult = parseFloat(evalResult.toFixed(4));
      setResult(evalResult); 
      setExpression((prev) => prev + " = " + evalResult.toString());
    } 
    catch (error) 
    {
      setResult("Error");
    }
  }

  //Clear results when user press 'AC'
  const clear = () => {
    setExpression("");  
    setResult(0);       
  }
  

  return(
    <div id="calculator-body">
       <Display expression={expression} result={result} />
       <Button updateValue={updateValue} handleResult={handleResult} clear={clear} />
     </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root')); 
