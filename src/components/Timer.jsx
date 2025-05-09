import { useCountdown } from "../hooks/useCountdown";
import TimerStyle from "../css/Timer.module.css"
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

const Timer = () => {
    const [days, hours, minutes] = useCountdown("sep 21, 2024 00:00:00")
    const {blur} = useContext(LoginContext);
    return (
        <article className={`${TimerStyle.timerBox} ${blur ? "": TimerStyle.active_blur}`}>
            <h2>Queremos que seas parte de este <br /> momento tan especial.</h2>
            <section>
            <div>
            <span>{days}</span>
            <h5>Días</h5>
            </div>
            <div>
            <span>{hours}</span>
            <h5>Horas</h5>
            </div>
            <div>
            <span>{minutes}</span>
            <h5>Minutos</h5>
            </div>
            </section>
        </article>
    );
}

export default Timer;
