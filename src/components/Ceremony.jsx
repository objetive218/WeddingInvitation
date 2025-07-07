import CeremonyStyle from '../css/Ceremony.module.css'
import { useContext, useEffect, useState } from 'react';
import LoginContext from '../contexts/LoginContext';
import axios from 'axios';
const Ceremony = () => {
    const [load, setLoad] = useState(false);
    const { confirmation, person, setPerson, membersValue, setMembersValue, blur, setBlur } = useContext(LoginContext);
    const [imageTrue, setImageTrue] = useState("img/radio_button_unchecked.svg")
    const [imageFalse, setImageFalse] = useState("img/radio_button_unchecked.svg")

    useEffect(() => {
        if (Object.keys(person).length !== 0) {
            localStorage.setItem('person', JSON.stringify(person))
        }
    }, [person]);

    const handleValue = (e) => {

        const { checked, name } = e.target
        setMembersValue({
            ...membersValue,
            [name]: checked,
        })
    }
    const manageToggleTime = (time) => {
        setTimeout(() => {
            setBlur(!blur)
        }, time)
    }
    const updateData = async (e, value) => {
        e.preventDefault();
        setLoad(value)
        value ? setImageTrue("img/task_done.svg") : setImageFalse("img/task_done.svg");

        if (value === undefined) {
            return console.log("error")
        } else {
            manageToggleTime(4000);
            setPerson({
                ...person,
                "attendance": load,
                "seen": true
            })
            await axios.put(`${import.meta.env.VITE_URL_DB}${person._id}`, {
                "attendance": value
            })
        }
    }
    const updateDataFamily = async (e) => {
        e.preventDefault();

        const res = await axios.put(`${import.meta.env.VITE_URL_DB}${person._id}`, {
            "seen": true,
            "confirmation": membersValue,
        })
        setBlur(!blur)
        setPerson({
            ...person,
            "seen": true
        })
        console.log(res);
    }
    const handleClick = () => {
        if (person.seen) {
            alert("Ya has confirmado tu invitacion")
        } else {
            manageToggleTime(0);
        }
    }
    return (
        <main className={`${CeremonyStyle.main} ${confirmation ? "" : CeremonyStyle.disaper}`}>
            <div className={`${CeremonyStyle.logoBox} ${blur ? "" : CeremonyStyle.active_blur}`}>
                <hr className={CeremonyStyle.line}></hr>
                <img src="img/Nosotros.gif" alt="logo Ceremony" />
                <hr className={CeremonyStyle.line}></hr>
            </div>

            <h2 className={CeremonyStyle.title}><span>&#8226;</span> CEREMONIA <span>&#8226;</span></h2>
            <section className={CeremonyStyle.date}>
                <article className={CeremonyStyle.boxDate}>
                    <h3><span>&#8226;</span>21<span>&#8226;</span></h3>
                    <h2>SEPTIEMBRE</h2>
                </article>
                <div className={CeremonyStyle.divLine}></div>
                <h5>3:00 P.M.</h5>
            </section>
            <h2 className={CeremonyStyle.title2}>HAENDA ALORIO</h2>
            <p className={CeremonyStyle.location}><span ><img src="./img/location_on.svg" alt="Map of location" className={CeremonyStyle.imglocation} /></span> Km. 10, Vereda del Arroyo Escondido</p>
            <span className={CeremonyStyle.btnUbi}><a target="_blank" href="https://www.google.com/maps/place/Hacienda+San+Pablo/@4.8900664,-74.1808132,19z/data=!3m1!4b1!4m6!3m5!1s0x8e407f39bd19f1ab:0x13755baee7846810!8m2!3d4.8900651!4d-74.1801681!16s%2Fg%2F11gj73135d?entry=ttu" >Ver Ubicación</a></span>
            <p className={CeremonyStyle.textConf}>Por favor haznos saber si podrás <br />acompañarnos en este día tan especial. <br /> <b> ¡Esperamos contar contigo en nuestra <br />celebración nupcial!</b></p>
            <div className={CeremonyStyle.formConfirm}>
                <button onClick={handleClick}>Confirmar Asistencia</button>
            </div>
            <form onSubmit={updateDataFamily} action="#" className={`${CeremonyStyle.formToggle} ${blur ? CeremonyStyle.active : ""}`}>
                {person.typeInvitation ?
                    <>
                        <label className={CeremonyStyle.title} htmlFor="confirm">¿Asistes a nuestra boda?</label>
                        <p>Confirma si asistirás seleccionando y dando clic en el botón de enviar.</p>
                        <section>

                            {person.members.names.map((element, index) => {
                                return <>

                                    <div key={index}>
                                        <h4  >{element}</h4>
                                        <label className={CeremonyStyle.boxToggle}>
                                            <input className={CeremonyStyle.checkbox} onChange={(e) => handleValue(e)} type="checkbox" name={element} id={`check${index}`} />
                                            <span className={CeremonyStyle.slider}></span>
                                        </label>
                                    </div>
                                </>
                            })}
                        </section>
                        <button type="submit" className={CeremonyStyle.btnSend}>Enviar</button>
                        <img src="/img/CM_Fecha.png" alt="" className={CeremonyStyle.imgDate} />
                    </>
                    : <>
                        <label className={CeremonyStyle.title} htmlFor="confirm">¿Asistes a nuestra boda?</label>
                        <h3>{person.name}</h3>
                        <p>Confirma si asistirás dando clic en el botón correspondiente.</p>
                        <div className={CeremonyStyle.oneInvition}>
                            <div>

                                <h4>¡Si, confirmo!</h4>
                                <button value={true} onClick={() => alert("Gracias por confirmar")/*Desactivado envio a la base de datos */}><img src={`${imageTrue}`} alt="" /></button>
                            </div>
                            <div>

                                <h4>No asistiré</h4>
                                <button value={false} onClick={(e) => updateData(e, false)}><img src={`${imageFalse}`} alt="" /></button>
                            </div>

                        </div>
                        <img src="/img/CM_Fecha.png" alt="" className={CeremonyStyle.imgDate} />
                    </>}

            </form>
            <p className={CeremonyStyle.lastDate}><b>El evento será exclusivamente para adultos.  <br /> Recuerda que puedes confirmar <br /> asistencia hasta el 31 de agosto de 2024.</b></p>
            <section className={`${CeremonyStyle.dress}`}>
                <article className={`${CeremonyStyle.logoBox}`}>
                    <hr className={CeremonyStyle.line}></hr>
                    <img src="img/vestimenta.gif" alt="logo Dress Code" />
                    <hr className={CeremonyStyle.line}></hr>
                </article>

                <h2><span>&#8226;</span> ESS CO <span>&#8226;</span></h2>
                <article className={`${CeremonyStyle.code} ${blur ? "" : CeremonyStyle.active_blur}`}>
                    <div className={CeremonyStyle.men}><h3>Ellos</h3><h4>Traje formal</h4><p>No tenis</p><p>no smoking</p></div>

                    <div className={CeremonyStyle.divLine}></div>
                    <div className={CeremonyStyle.women}><h3>Ellas</h3><h4>Vestido Largo</h4><p>No blanco</p><p>no rojo</p></div>

                </article>
            </section>
        </main>
    );
}

export default Ceremony;
