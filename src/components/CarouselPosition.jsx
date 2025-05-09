import UsStyle from "../css/Us.module.css"
const carouselPosition = ({images, activeIndex, func}) => {
    return (
        <div className={UsStyle.allIndicators}>
            {images.map((_, index) => (
                <span key={index} className={`${index === activeIndex ? UsStyle.indicatorsactive : "" }`} id={UsStyle.indicators} onClick={() => 
                    func(index)
                }>
                </span>
            ))
            }
        </div>
    )
}
export default carouselPosition;