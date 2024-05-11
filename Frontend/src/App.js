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
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import BlogPost from "./components/Blog/BlogPost";
import Dashboard from "./components/AdminPanel/Dashboard";
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


            <Route exact path="/" element={<Home mode={mode}  title='Home - Sainty' />} />

            {/* Routes for authentication */}
            <Route exact path="/login" element={<Login mode={mode}  title='Login - Sainty' />} />
            <Route exact path="/register" element={<Register mode={mode}  title='Register - Sainty' />} />


            {/* Routes for webpages */}
            <Route exact path="/projects" element={<Projects mode={mode}  title='Projects - Sainty'/>}/>
            <Route exact path="/certifications" element={<Certificates mode={mode}  title='Certificates - Sainty'/>} />
            <Route exact path="/blog" element={<Blog mode={mode}  title='Blog - Sainty'/>} />
            <Route exact path="/your-portfolio" element={<YourPortfolio mode={mode}  title='Your Portfolio - Sainty'/>} />


            {/*  Dynamic routes with parameters :id to show blogs*/}
            <Route exact path="/blog/:blogurl" element={<BlogPost mode={mode} />} />


            {/* Routes for admin panel operations */}
            <Route exact path="/admin" element={<Dashboard mode={mode}  title='Admin - Sainty' />} />

            {/* Routes for legal Pages */}
            <Route exact path="/about" element={<About mode={mode} title='About - Sainty'/> } />
            <Route exact path="/disclaimer" element={<Disclaimer mode={mode}   title='Disclaimer - Sainty'/>} /> 
            <Route exact path="/privacy-policy" element={<PrivacyPolicy mode={mode}  title='Privacy Policy - Sainty' />} /> 
            <Route exact path="/gdpr-compliance" element={<GDPRCompliance mode={mode}  title='GDPR Compliance - Sainty' />} /> 



          </Routes>
        </div>
        <Footer mode={mode}/>
      </Router>
    </div>
  );
}

export default App;
