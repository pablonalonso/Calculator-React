import './App.css';
import { useState } from 'react';

//! Component
function App() {
    //*--------------------------------------
    //!State of the component  
    const [calc, setCalc] = useState('')
    const [result, setResult] = useState('0')

    //!Operators
    const operators = ['+','-','*','/', '.', '(', ')']
    console.log()

    //! updateCalc()
    const updateCalc = (value)=>{

        if ( (operators.includes(value) && calc === '' && value !== '-' && value !== '(' ) || 
             (operators.includes(value) && operators.includes(calc.slice(-1)))
        ) {return}


        if (value === '(' && !operators.includes(calc.slice(-1))) {
            setCalc(calc + '*' + value);
          } else {
            setCalc(calc + value);
          }

        if (!operators.includes(value)) {
                setResult(eval(calc + value).toString())
            
        
      }
    }                                                           

    //! clearAll()
    const clearAll = ()=>{
        setCalc('0')
        setResult('0')
    }              
    
    //! deleteOneCharacter

    const deleteOneChar = () => {
        if (calc.length > 0) {
          let newCalc = calc.slice(0, -1);
          if(operators.includes(newCalc.slice(-1))){
            newCalc = newCalc.slice(0, -1)
          }
          setCalc(newCalc);
          if (newCalc.length > 0) {
            const result = eval(newCalc);

            setResult(result.toString());
          } else {
            setResult('0');
          }
        }
      };

    //! calculateOperation()
    const calculateOperation=()=>{
        if (operators.includes(calc.slice(-1))) {
            return
        } else{
            setCalc(eval(calc).toString())
        }
        
    }                                                                                                                                                                                                       
    //*--------------------------------------
    //! createDigits()
    const createDigits = ()=>{
        const digits = []
        for (let i = 1; i < 10; i++) {
            digits.push(
                <button
                key={i}
                onClick={ ()=> updateCalc(i.toString())}
                >
                    {i}
                </button>
            )
        }
        return digits
    }
    //*--------------------------------------
    //! Return of the component
    return (
            <div className="App">
              
                <div className='calculator'>

                    <div className='display'>
                        <span className='title'>React Calculator</span>
                        { calc || '0' }
                        { result ? <span> ({result})</span> : ''}
                    </div>

                    <div className='operators'>
                        <button onClick={ ()=> updateCalc('/') }>÷</button>
                        <button onClick={ ()=> updateCalc('*') }>×</button>
                        <button onClick={ ()=> updateCalc('+') }>+</button>
                        <button onClick={ ()=> updateCalc('-') }>-</button>

                        <button onClick={ ()=> deleteOneChar() }>DEL</button>
                        <button onClick={ ()=> clearAll() }>AC</button>
                    </div>
                    
                    <div className='digits'>

                        { createDigits() }
                        <button   className='greenButton' onClick={ ()=> updateCalc('(')}>(</button>
                        <button   className='greenButton' onClick={ ()=> updateCalc(')') }>)</button>

                        <button  className="greenButton"  onClick={ ()=> updateCalc('.') }>.</button>
                        <button  className='blueButton' onClick={ ()=> updateCalc('0') }>0</button>
                        <button className='blueButton' onClick={ ()=> calculateOperation() }>=</button>
                    
                    </div>
                </div>
            </div>
    );
    }

    export default App;