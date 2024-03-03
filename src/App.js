import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Disclaimer from "./components/Pages/Disclaimer";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import Projects from "./components/Projects/Projects";
import Blog from "./components/Blog/Blog";
import YourPortfolio from "./components/YourPortfolio/YourPortfolio";
import Certificates from "./components/Certification/Certificates";
import GDPRCompliance from "./components/Pages/GDPRCompliance";
import About from "./components/Pages/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.body.style.background = mode === 'dark' ? 'linear-gradient(125deg, #000000, #000000, #0D0A2D)' : 'linear-gradient(125deg, #DEE4EA, #F9FCFF, #E1D8E8)';
  }, [mode]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.background = 'linear-gradient(125 deg, #000000, #000000, #130F40)';
    } else {
      setMode('light');
      document.body.style.background = 'linear-gradient(125deg, #DEE4EA, #F9FCFF, #E1D8E8)';
    }
  }

  return (
    <div >
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <div style={{ height: '100%', overflowY: 'auto',}}>
          <Routes>
            <Route exact path="/" element={<Home mode={mode} />} />
            <Route exact path="/disclaimer" element={<Disclaimer mode={mode} />} /> 
            <Route exact path="/privacy-policy" element={<PrivacyPolicy mode={mode} />} /> 
            <Route exact path="/gdpr-compliance" element={<GDPRCompliance mode={mode} />} /> 
            <Route exact path="/about" element={<About mode={mode}/>} />
            {/* <Route exact path="/education" element={<Education/>} /> */}
            <Route exact path="/projects" element={<Projects mode={mode}/>}/>
            <Route exact path="/blog" element={<Blog mode={mode}/>} />
            <Route exact path="/your-portfolio" element={<YourPortfolio mode={mode}/>} />
            <Route exact path="/certifications" element={<Certificates mode={mode}/>} />
            {/* <Route exact path="/contact" element={<Contact/>} /> */}
            {/* Add other routes here */}
          </Routes>
        </div>
        <Footer mode={mode}/>
      </Router>
    </div>
  );
}

export default App;
