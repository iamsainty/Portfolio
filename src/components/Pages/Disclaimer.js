import React, { useEffect } from 'react';
import Introduction from '../Introduction';
import { Link } from 'react-router-dom';

const Disclaimer = (props) => {
  useEffect(() => {
      document.title = `${props.title}`;
    }, [props.title]);
  let mode = props.mode;
  const headings = [
    "Accuracy of Information",
    "No Guarantees",
    "Development of the Portfolio",
    "External Links",
    "Limited Liability",
  ]
  return (
    <div className="container mt-5">
      <Introduction array={headings} heading={"Disclaimer"} mode={mode} /> <br /><br /><br />
      <div style={{padding: '2vh', textAlign: 'justify' }}>



      <p style={{fontSize: '2vh'}}>Welcome to the personal portfolio of Priyanshu Chaurasiya, This static website has been created to showcase Priyanshu Chaurasiya's professional life, including skills, projects, industry experience, educational background, blogs, certifications, and contact information.</p><br/>


      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>Accuracy of Information</h2>
      <p style={{fontSize: '2vh'}}>While every effort has been made to ensure the accuracy of the information provided on this portfolio, Priyanshu Chaurasiya does not guarantee the correctness or completeness of the content. The information is presented based on his knowledge at the time of publishing.</p><br/>



      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>No Guarantees</h2>
      <p style={{fontSize: '2vh'}}>Users of this portfolio acknowledge that Priyanshu Chaurasiya does not provide any guarantees regarding the accuracy, reliability, or suitability of the information and materials for any particular purpose. Any reliance placed on the information provided is at the user's own risk.</p><br/>



      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>Development of the Portfolio</h2>
      <p style={{fontSize: '2vh'}}>This portfolio has been developed by Priyanshu Chaurasiya. The design, structure, and content are the result of his efforts, and any reproduction or use of elements from this portfolio without permission is strictly prohibited.</p><br/>



      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>External Links</h2>
      <p style={{fontSize: '2vh'}}>This portfolio may contain links to external websites for reference or additional information. Priyanshu Chaurasiya is not responsible for the content, accuracy, or privacy practices of these external sites. Users are encouraged to review the terms and policies of linked websites before accessing them.</p><br/>



      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>Limited Liability</h2>
      <p style={{fontSize: '2vh'}}>Priyanshu Chaurasiya shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of the use or inability to use this portfolio or its content. This includes, but is not limited to, errors or omissions in the content, loss of data, or any other matter relating to the portfolio.</p><br/>



      <h2 style={{fontSize: '3.5vh', fontWeight: 'bold'}}>Contact Information</h2>
      <p style={{fontSize: '2vh'}}>For any inquiries or concerns related to this disclaimer or the portfolio content, please contact Priyanshu Chaurasiya at <Link to="mailto:your@email.com">ppriyanshuchaurasia@gmail.com</Link>.</p><br/>

    </div>
    </div>
  );
};

export default Disclaimer;
