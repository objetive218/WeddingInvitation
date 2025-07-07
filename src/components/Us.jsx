import UsStyle from "../css/Us.module.css"
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const Us = () => {
    const images = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/9.png', 'img/10.png'];
    const { blur, confirmation } = useContext(LoginContext)

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5500,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "linear"
    };

    return (
        <section className={`${UsStyle.us} ${blur ? "" : UsStyle.active_blur} ${confirmation ? "" : UsStyle.disaper}`}>
            <div className={UsStyle.containerCrousel}>

                <h2><span>&#8226;</span> NOSOTROS <span>&#8226;</span></h2>

                <div className={UsStyle.carousel}>



                    <Slider {...settings}>

                        {images.map((e, i) => (
                            <div key={i} >
                                <div >

                                    <img src={e} alt="images of the bride and groom " loading="eager" className={` ${UsStyle.type}`} />
                                </div>

                            </div>)
                        )}
                    </Slider>
                </div>

            </div>
            <div className={UsStyle.ideas}>
                <div className={UsStyle.logoBox}>
                    <hr className={UsStyle.line}></hr>
                    <img src="img/Regalo.gif" alt="envelope" />
                    <hr className={UsStyle.line}></hr>
                </div>
                <h2 className={UsStyle.titleEnv}><span>&#8226;</span> LLUVIA  SOES <span>&#8226;</span></h2>
                <p className={UsStyle.textEnv}>Tu presencia es fundamental para nosotros,<br /> pero si deseas añadir un toque especial,<br /> puedes hacerlo con una lluvia de sobres</p>
            </div>
        </section>
    );
}

export default Us;
