import {  useContext, useEffect, useState } from "react";
import logStyle from "../css/Login.module.css"
import  axios  from "axios";
import LoginContext from "../contexts/LoginContext";
import InputCode from "./inputCode";
import {motion} from 'framer-motion'

const personalInvitation = (person, localConfirm) => {
    return (
        <section className={`${logStyle.all} ${localConfirm ? "" : logStyle.disaper }`}> 

        
                {person.gender ===  null && <h2>Bienvenidos</h2>}
                {person.gender && <h2>Bienvenido</h2>}
                {person.gender === false && <h2>Bienvenida</h2>}
                <motion.div
                    initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
                >

              <h1 className={logStyle.personName} > {person.name}</h1>
                </motion.div>
                <p>”Uno solo puede ser vencido, pero dos pueden resistir. <br />
                    ¡La cuerda de tres hilos no se rompe fácilmente!” <br />
                    <b>Eclesiastés 4:12</b>       
                </p>
        </section > 
    )
}
const Login = () => {
    const {setConfirmation, person, setPerson, setMembersValue} = useContext(LoginContext);
    const [localConfirm, setLocalConfirm] = useState(false);
    const [loading, setLoading] = useState(false)
    /*
    const [data,setData] = useState({});
    useEffect(() => {
        fetchData();
    },[])
    const fetchData = async() => {
        const res = await axios.get("http://localhost:3001/invitations")
        setData(res.data.invitations)
       // console.log(res)
        
    }
    const updateForm = (e) => {
        let value = e.target.value;
        setFormInf(value);
    }
*/
    const getPerson = async(code) => {
       
        setLoading(true);
        setTimeout(() => setLoading(false), 10000)
        const res = await axios.get(`${import.meta.env.VITE_URL_DB}${code}`).catch(() => {
            alert("El codigo es incorrecto")
        })
        
        setPerson(res.data.invitation);
        setTimeout(() => {  
            if(res.data.invitation.typeInvitation){
                setMembersValue(res.data.invitation.members.confirmation)
            }
            setLocalConfirm(true);
            setTimeout(() => {
                setConfirmation(true)
            },5000);
        },1500)     
    }
    useEffect(() => {
        if(Object.keys(person).length !== 0){
            localStorage.setItem('person', JSON.stringify(person))
            localStorage.setItem('confirmation', JSON.stringify(localConfirm))
        }
    }, [person,localConfirm]);
    
    return (
        <>
         {localConfirm === false ? <section className={logStyle.all}> 
              <h2 className={logStyle.label}>Ingresa tu código:</h2>
              <InputCode loading={loading} onComplete={getPerson}/>
            
        </section > :""}
        {personalInvitation(person,localConfirm)}
        
        </>
    );
}

export default Login;
