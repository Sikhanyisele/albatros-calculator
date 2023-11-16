import './App.css';
import Calculator from "./calculator";
import {useEffect} from "react";

function CalculatorApp() {
    useEffect(() => {
        document.title = 'Calculator App';
    }, []);

    return (
        <div className="CalculatorApp">
            <Calculator />
        </div>
    );
}
export default CalculatorApp;
