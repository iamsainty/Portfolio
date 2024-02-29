import './App.css';
import React from "react";
// import About from './components/About';
// import Education from './components/Education';
// import Projects from './components/Projects';
// import Blog from './components/Blog';
// import Contact from './components/Contact';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';

function App() {
  return (
    <div>
      <Router>
          <Navbar/>
          
          <Routes>
            <Route exact path="/" element={<Home/>} />
            {/* <Route exact path="/about" element={<About/>} />
            <Route exact path="/education" element={<Education/>} />
            <Route exact path="/projects" element={<Projects/>}/>
            <Route exact path="/blog" element={<Blog/>} />
            <Route exact path="/contact" element={<Contact/>} /> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
