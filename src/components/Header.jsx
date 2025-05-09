import HeaderStyle from "../css/Header.module.css"
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

const MusicPlay = () => {
    return(
        <audio controls autoPlay loop>
                <source autoPlay src="sound/Por_el_resto_de_mi_vida_10.mp3" type="audio/mp3"  />
            </audio>
    )
}

const Header = () => {
    const {confirmation} = useContext(LoginContext)
    return (
        <header className={`${HeaderStyle.head} ${confirmation ? "": HeaderStyle.view}`}>
            <div>
                <svg width={"300"} height={"130"}>
                    <path id="curve" d="M 0 120 C 0 120, 100 50, 300 120"    fill="transparent"/>
                        <text className={HeaderStyle.text} fill="#081330"  textAnchor="middle">
                            <textPath className={HeaderStyle.text_path} href="#curve" startOffset={"50%"}>
                                &#8226; NOS CASAMOS &#8226;
                            </textPath>
                        </text>
                </svg>
            </div>
            <img src="img/CYM_animado.gif" alt="animate logo" />
            <h2 className={HeaderStyle.names}>Cristian & Milena</h2>
            {confirmation && <MusicPlay/>}
        </header>
    );
}

export default Header;
