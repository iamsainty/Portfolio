import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Introduction from '../Introduction';

export default function YourPortfolio(props) {

  useEffect(() => {
    document.title = `${props.title}`;
  }, [props.title]);
  let mode=props.mode;

  const headings =[
    "You could have similar portfolio",
    "Scroll down for details"
  ]
  return (
    <div className='container'>
      <Introduction array={headings} heading={"Loving portfolio ?"} mode={mode} />
      <div style={{ height: '20vh', width: '100%' }}></div>
      <div className="container" style={{ padding: '3vh', textAlign: 'justify', color: props.mode === 'dark' ? 'white' : 'black' }}>
        <header>
          <p style={{ fontSize: '2vh' }}>Thank you for choosing me to build your portfolio. Your trust in my work is truly appreciated, and I am excited to embark on this creative journey with you. Rest assured, I am committed to delivering a portfolio that not only meets but exceeds your expectations.</p>
        </header>
        <br />

        <section id="developer">
          <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Know the Developer</h2>
          <p style={{ fontSize: '2vh' }}>Hello, I'm Priyanshu Chaurasiya, a passionate third-year Computer Science Engineering student at BBDITM, Lucknow. Designing layouts has been my hobby since before I chose CSE as my major. Now, developing them in code, especially with technologies like HTML, CSS, and JavaScript, particularly React.js, is something I deeply enjoy. If you're curious to know more about me, click <Link to='/about'>Click here</Link>.</p>
        </section>
        <br />

        <section id="project-details">
          <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Project Details</h2>
          <br />

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Tech Stack</h3>
          <p style={{ fontSize: '2vh' }}>My expertise lies in HTML, CSS, and JavaScript, with a special focus on React.js, ensuring a dynamic and visually appealing portfolio.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Layout</h3>
          <p style={{ fontSize: '2vh' }}>Your portfolio will feature sections on Introduction, Skills, Projects, Experience, Educational Details, and Contact Information, providing a comprehensive overview of your professional identity.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Hosting</h3>
          <p style={{ fontSize: '2vh' }}>I utilize Google Firebase Hosting for reliable and efficient hosting, ensuring seamless accessibility for your audience.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Domain Name</h3>
          <p style={{ fontSize: '2vh' }}>Your portfolio will have a personalized touch with a unique domain name: <em>your-name.web.dev</em>.</p>
        </section>
        <br />

        <section id="benefits">
          <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Benefits</h2>
          <br />

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Flexibility</h3>
          <p style={{ fontSize: '2vh' }}>I understand that your preferences may evolve. That's why I offer the flexibility to make changes to the layout based on your recommendations, ensuring your portfolio reflects your evolving style.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Responsiveness</h3>
          <p style={{ fontSize: '2vh' }}>Your portfolio will be designed to be responsive across all devices, providing a consistent and engaging user experience.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>SEO</h3>
          <p style={{ fontSize: '2vh' }}>With a commitment to quality, I guarantee a Google Lighthouse SEO score of at least 90%, enhancing your online visibility.</p>

          <h3 style={{ fontSize: '3vh', fontWeight: 'bold' }}>Analytics</h3>
          <p style={{ fontSize: '2vh' }}>You'll have real-time access to data and analytics for your portfolio, allowing you to track its performance and audience engagement.</p>
        </section>
        <br />

        <section id="warning">
          <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Warning</h2>
          <p style={{ fontSize: '2vh' }}>Please note that the source code will not be provided. I will create and optimize your portfolio, but you'll be responsible for managing the Search Console and Analytics.</p>
        </section>
        <br />

        <section id="pricing" >
          <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Pricing</h2>
          <br /><br />
          <div className="container text-center">
            <div className="row align-items-start">
            <div className="col-md-6" style={{ marginBottom: '10vh'}}>
                <div className="card" style={{ border: '1px solid', borderColor: props.mode === 'dark' ? 'white' : 'black', borderRadius: '0' }}>
                  <div className="card-header" style={{ fontWeight: 'bold', background: props.mode === 'dark' ? 'linear-gradient(135deg, #3C3C3C, #000000)' : 'linear-gradient(135deg, #EDF1F4, #C3CBDC)', color: props.mode==='dark'?'white':'black' }}>
                    Single Page
                  </div>
                  <div className="card-body" style={{ fontSize: '2vh', background: props.mode === 'dark' ? 'linear-gradient(135deg, #0E1213, #000000)' : 'linear-gradient(135deg, #F9FCFF, #DEE4EA)' }}>
                    <p className="card-title" style={{ fontSize: '4vh', fontWeight: 'bolder', marginBottom: '2vh', color: props.mode==='dark'?'white':'black' }}>Rs. 199/-</p>
                    <p className="card-text" style={{ fontWeight: 'bold', color: props.mode==='dark'?'white':'black' }}>Sections of Home page</p>
                    <ul className="list-group list-group-flush text-center" style={{ background: 'transparent', fontSize: '2vh', color: props.mode === 'dark' ? 'white' : '#191919' }}>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Projects</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Skills</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Experience</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Education</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>More of your choice</li>
                    </ul>

                    <Link to="https://wa.me/+918572937042?text=Your%20portfolio%20looks%20great%2C%20can%20you%20build%20the%20same%20for%20me" className={`btn btn-outline-${props.mode==='dark'?'light':'dark'}`} style={{ marginTop: '3vh', marginBottom: '3vh', width: '100%' }}>Get Started</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6" style={{ marginBottom: '10vh'}}>
                <div className="card" style={{ border: '1px solid', borderColor: props.mode === 'dark' ? 'white' : 'black', borderRadius: '0' }}>
                  <div className="card-header" style={{ fontWeight: 'bold', background: props.mode === 'dark' ? 'linear-gradient(135deg, #3C3C3C, #000000)' : 'linear-gradient(135deg, #EDF1F4, #C3CBDC)', color: props.mode==='dark'?'white':'black' }}>
                    Multi Page
                  </div>
                  <div className="card-body" style={{ fontSize: '2vh', background: props.mode === 'dark' ? 'linear-gradient(135deg, #0E1213, #000000)' : 'linear-gradient(135deg, #F9FCFF, #DEE4EA)' }}>
                    <p className="card-title" style={{ fontSize: '4vh', fontWeight: 'bolder', marginBottom: '2vh', color: props.mode==='dark'?'white':'black' }}>Rs. 50/- per page</p>
                    <p className="card-text" style={{ fontWeight: 'bold', color: props.mode==='dark'?'white':'black' }}>Additional pages</p>
                    <ul className="list-group list-group-flush text-center" style={{ background: 'transparent', fontSize: '2vh' }}>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>About</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Project</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Contact</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>Certification</li>
                      <li className="list-group-item" style={{ background: 'transparent', color: props.mode==='dark'?'white':'black' }}>More of your choice</li>
                    </ul>

                    <Link to="https://wa.me/+918572937042?text=Your%20portfolio%20looks%20great%2C%20can%20you%20build%20the%20same%20for%20me" className={`btn btn-outline-${props.mode==='dark'?'light':'dark'}`} style={{ marginTop: '3vh', marginBottom: '3vh', width: '100%' }}>Get Started</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <p style={{ fontSize: '2vh' }}>I am dedicated to bringing your vision to life through a professional and captivating portfolio. Let's create something extraordinary together! If you have any questions or specific requests, feel free to reach out. I look forward to working with you.</p>
        </section>
      </div>
    </div>
  )
}
