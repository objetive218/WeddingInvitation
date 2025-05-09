import { createContext, useEffect, useState } from "react";


const LoginContext = createContext();
const LoginProvider = function({children}){
    const [confirmation, setConfirmation]= useState(false);
    const [membersValue, setMembersValue ] = useState({})
    const [person, setPerson] = useState({});
    const [blur, setBlur] = useState(true);
    useEffect(() => {
        const person1 = JSON.parse(localStorage.getItem('person'));
        const confirmation1 = JSON.parse(localStorage.getItem('confirmation'));
        if(person1 && confirmation1){
            setPerson(person1)
            setConfirmation(confirmation1)
        }
    },[])
    return (<LoginContext.Provider value={{confirmation, setConfirmation,person, setPerson, membersValue, setMembersValue, blur, setBlur}}>{children}</LoginContext.Provider>)
}

export { LoginProvider };
export default LoginContext;