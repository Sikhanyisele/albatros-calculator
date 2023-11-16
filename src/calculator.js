import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClockRotateLeft, faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
const Calculator = () => {
    const [expressionOnView, setExpressionOnView] = useState('');
    const [history, setHistory] = useState([]);
    const [isNewCalculation, setIsNewCalculation] = useState(true);
    const [previousResult, setPrevResult] = useState(null);
    const [lastInputIsOperator, setLastInputIsOperator] = useState(false);
    const [viewHistoryInFullView, setViewHistoryInFullView] = useState(false)

    const addToDisplay = (value) => {
        if (isNewCalculation && /\d/.test(value)) {
            // Checking if it's a new calculation and a number is pressed, we then start a new expression
            setExpressionOnView(value);
            setIsNewCalculation(false);
            setLastInputIsOperator(false);
        } else {
            setExpressionOnView((previousDisplay) => {
                if (lastInputIsOperator && /[+*/-]/.test(value)) {
                    // Checking if the last input was an operator and the current input is an operator,
                    // Then use the previous result as the first number and add the current operator
                    return previousResult !== null ? previousResult + value : previousDisplay + value;
                } else {
                    // Adding the current value to the display
                    return previousDisplay + value;
                }
            });

            setLastInputIsOperator(/[+*/-]/.test(value));
            setIsNewCalculation(false); // Adjusted here
        }
    };
    const clearCalculation = () => {
        // Clearing the entered value
        setExpressionOnView('');
        setIsNewCalculation(true);
    };
    const clearEnteredValue = () => {
        setExpressionOnView((prevDisplay) => prevDisplay.slice(0, -1));
    };

    const viewHistoryFullScreen = () => {
      if (!viewHistoryInFullView) {
          setViewHistoryInFullView(true)
      } else {
          setViewHistoryInFullView(false)
      }
    }

    const executeCalculation = () => {
        try {
            const mathToCalculate = isNewCalculation? expressionOnView : expressionOnView.split("=").pop()
            const result = eval(mathToCalculate);
            const expression =  mathToCalculate + ` = ${result}`;
            setHistory((prevHistory) => [...prevHistory, { expression, result }]);
            setExpressionOnView(expression);
            setIsNewCalculation(true);
        } catch (error) {
            setExpressionOnView('');
        }
    };
    return (
            <div className='w-[340px] h-[630px] border-8 border-gray-800 bg-white rounded-3xl shadow-md flex flex-col relative' id="calculator">
                <div className={`flex-grow overflow-y-auto p-5 box-border text-gray-500 font-bold ${viewHistoryInFullView? 'mt-0 text-center' : 'mt-16 text-right'}`} id="history">
                    <h4 className={`${viewHistoryInFullView? 'text-black': 'hidden'}`}>Full history</h4>
                    {history.map((entry, index) => (
                        <p  key={index}>{`${entry.expression} `}</p>
                    ))}
                </div>
                <div>
                    <input className=' w-[240px] mb-2 h-[65px] current-calculation rounded-2xl	 border-2 font-bold text-xl border-purple-600 text-center' type="text" value={expressionOnView} readOnly />
                </div>

                    <div className=' place-content-center'>
                    <button className='m-2 w-[50px] h-[50px] bg-violet-300  text-white font-bold text-20  drop-shadow-md rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-xl ' onClick={() => viewHistoryFullScreen()}>   <FontAwesomeIcon icon={faClockRotateLeft} /></button>
                    <button className='m-2 w-[50px] h-[50px] bg-violet-300  text-white font-bold text-20  drop-shadow-md rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-xl' onClick={() => clearCalculation()}>AC</button>
                    {/* As instructed, we leave the following which is multiplication and division, with no call-to-action, only catering for plus and minus operations. */}
                    <button className='m-2 w-[50px] h-[50px] bg-violet-300  text-white font-bold text-20  drop-shadow-md rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-xl' onClick={() => {}}>*</button>
                    <button className='m-2 w-[50px] h-[50px]  bg-violet-300 text-white font-bold text-20 drop-shadow-md drop-shadow-lg rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-lg' onClick={() => {}}>/</button>
                    <br />
                    <button className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100  drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('7')}>7</button>
                    <button className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100  drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('8')}>8</button>
                    <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100  drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('9')}>9</button>
                    <button  className='m-2 w-[50px] h-[50px]  bg-violet-300  text-white font-bold text-20  drop-shadow-md rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-lg ' onClick={() => addToDisplay('+')}>+</button>
                    <br />
                    <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('4')}>4</button>
                    <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('5')}>5</button>
                    <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('6')}>6</button>
                    <button  className='m-2 w-[50px] h-[50px]  bg-violet-300 text-white font-bold text-20 drop-shadow-md rounded-lg cursor-pointer bg-purple-200 text-white font-bold text-xl ' onClick={() => addToDisplay('-')}>-</button>
                    <br />
                    </div>
                    <div className='flex px-3 mb-6'>
                        <div className='py-1'>
                            <button  className='m-2 w-[50px] h-[50px] bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('1')}>1</button>
                            <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100  drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('2')}>2</button>
                            <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100  drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('3')}>3</button>
                            <br />
                            <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={clearEnteredValue}><FontAwesomeIcon icon={faDeleteLeft} /></button>
                            <button  className='m-2 w-[50px] h-[50px]  bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('0')}>0</button>
                            <button className='m-2 w-[50px] h-[50px] bg-white border-2 border-gray-100 drop-shadow-md rounded-lg cursor-pointer text-violet-600 font-bold text-xl' onClick={() => addToDisplay('.')}>.</button>
                        </div>
                        <button  className=' h-[118px] w-[52px] bg-violet-500  border-2 border-gray-100 drop-shadow-md rounded-lg  ml-2 text-white font-bold text-xl mt-3' onClick={executeCalculation}>=</button>
                    </div>
            </div>

    );
};

export default Calculator;
