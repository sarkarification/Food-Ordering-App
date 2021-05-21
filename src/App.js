import React,{useState} from 'react' 
import classes from './App.module.css';
import Header from './components/Sections/Header';
import NameSlider from './components/Sections/NameSlider';
import About from './components/Sections/About';
import Services from './components/Sections/Services';
import WorkExp from './components/Sections/WorkExp';
import Footer from './components/Sections/Footer';
import NavBar from './components/Sections/NavBar';
// import Education from './components/Sections/Education';

const App =() => {

  const [showNav, setShowNav]= useState(false);

  const showNavHandler = () => {
    setShowNav(true)
  }

  const hideNavHandler = () => {
    setShowNav(false)
  }

  return (
    <div className={classes.appContainer}>
      {showNav && <NavBar onClose={hideNavHandler} />}
      <div className={classes.app}>
        <Header onShow={showNavHandler}/>
        <NameSlider />
        <About id="About"/>
        <Services />
        <WorkExp />
        {/* <Education /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
