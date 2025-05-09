import {motion, useAnimation, useInView} from 'framer-motion'
import { useEffect, useRef } from 'react';


const Reveal = ({children}) => {
    const ref = useRef(null);
    const isInview = useInView(ref, {one: true})
    const mainControls = useAnimation();
    const slideControls = useAnimation();

/*<motion.div variants={{
                hidden:{left:0},
                visible:{left:"100%"},
            }}
            initial='hidden'
            animate={slideControls}
            transition={{duration:0.5, ease: "easeIn"}}
            style={{background:"white",position:"absolute", zIndex:20}}
            />
 */
    useEffect(() => {
        if(isInview){
            mainControls.start("visible");
            slideControls.start("visible")
        }
    },[isInview])
    return (
        <div ref={ref}>
            <motion.div
            variants={{
                hidden:{opacity: 0, y:75},
                visible:{opacity:1, y:0},
            }}
            initial='hidden'
            animate= {mainControls}
            transition={{duration: 0.6, delay: 0.60}}
            viewport={{ root: ref }}
            >{children}
            </motion.div>
        </div>
    );
}

export default Reveal;
