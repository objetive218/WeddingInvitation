import { useContext } from 'react'
import './App.css'
import Ceremony from './components/Ceremony'
import Header from './components/Header'
import Timer from './components/Timer'
import Us from './components/Us'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'
import HeaderStyle from "./css/Header.module.css"
import Reveal from './components/utils/Reveal'
import { motion } from 'framer-motion'


function App() {

  const { confirmation } = useContext(LoginContext)

  return (
    <>


      {confirmation === false &&
        <Reveal>

          <Login />
        </Reveal>
      }

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <section className={`${HeaderStyle.box} ${confirmation ? "" : HeaderStyle.active}`}>
          <picture className={`${HeaderStyle.pic} ${confirmation ? "" : HeaderStyle.active}`}>
            <img src="img/portada.png" alt="principal_image" className={`${HeaderStyle.port} ${confirmation ? "" : HeaderStyle.active}`} />
          </picture>
        </section>
      </motion.div>



      <Reveal>
        <Header />
      </Reveal>


      {confirmation &&
        <Reveal>
          <Timer />
        </Reveal>
      }


      <Reveal>

        <Ceremony />
      </Reveal>





      <Us />


    </>
  )
}

export default App
