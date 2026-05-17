import React, { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Loader from './components/loader/Loader';
import Hero from './sections/Hero';
import Navbar from './components/navbar/Navbar';
import About from './sections/About';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis()
  return (
   <>
    <Loader onComplete={() => setLoaded(true)} />
    {loaded &&
    <>
    <Navbar />
    <Hero />
    <About />
    <Work />
    <Skills />
    <Contact />
    </> 
    }
   </>
  )
}

export default App