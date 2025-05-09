import { useRef, useState } from "react";
import logStyle from "../css/Login.module.css"

const InputCode = ({loading, onComplete}) => {
    const [password, setPassword] =  useState(Array(4).fill(""));
    const inputs = useRef([]);

    const manageInput = (e, slot) => {
        const num = e.target.value;
        if(/[^0-9]/.test(num))return;
        const newPassword = [...password];
        newPassword[slot] = num;
        setPassword(newPassword);
        if(slot !== 3){
            inputs.current[slot + 1].focus();
        }
        if(newPassword.every(Element => Element !== "")){
            onComplete(newPassword.join(""));
        }
    }

    const onDelet = (e, slot) => {
        if(e.keyCode === 8 && !password[slot] && slot !== 0){
            const newPassword = [...password];
            newPassword[slot - 1] = "";
            setPassword(newPassword);
            inputs.current[slot - 1].focus();
        }
    }

    return (
       
        <div className={logStyle.boxInputs}>

        <div className={logStyle.singleInput}>
            {password.map((num,index) => {
                return (
                    <input type="text" 
                    key={index}
                    inputMode="numeric"
                    maxLength={1}
                    value={num}
                    autoFocus={!password[0].length && index === 0}
                    readOnly={loading}
                    onChange={e => manageInput(e,index)}
                    onKeyUp={e => onDelet(e, index)}
                    ref={ref => inputs.current.push(ref)}
                    />
                )
            })}
        </div>
            </div>
           
    );
}

export default InputCode;
