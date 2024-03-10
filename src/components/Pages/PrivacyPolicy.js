import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Introduction from '../Introduction';

export default function PrivacyPolicy(props) {
  useEffect(() => {
      document.title = `${props.title}`;
    }, [props.title]);
  let mode=props.mode;
  const headings=[
    "Information We Collect",
    "Collection Methods",
    "Purpose of Collection",
    "User Rights",
    "Security",
    "Cookies and Tracking",
    "Third Party Links",
  ]
  return (
    <div className="container mt-5">

      <Introduction mode={mode} heading={"Privacy Policy"} array={headings}/> <br /><br />
      <div style={{padding: '2vh', textAlign: 'justify' }}>


      <p style={{ fontSize: '2vh' }}>Welcome to Priyanshu Chaurasiya's Portfolio Website, This Privacy Policy outlines how personal information may be collected, processed, and used when you visit my portfolio. Please read the following information carefully to understand our practices regarding your data and how we handle it.</p><br />

      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Information We Collect</h2>

      <h4>Personal Information</h4>
      <p style={{ fontSize: '2vh' }}>We do not explicitly collect any personal information from visitors. You are not required to provide any data to access or use our portfolio website.</p><br />

      <h4>Usage Information</h4>
      <p style={{ fontSize: '2vh' }}>We utilize Google Analytics to automatically collect and analyze certain information about your device, browser, and usage patterns. This data may include IP addresses, device identifiers, and other non-personal information.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Collection Methods</h2>

      <h4>Google Analytics</h4>
      <p style={{ fontSize: '2vh' }}>We use Google Analytics to track the performance and user interactions on our portfolio website. Google Analytics collects data through cookies and similar technologies.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Purpose of Collection</h2>

      <h4>Performance Tracking</h4>
      <p style={{ fontSize: '2vh' }}>The primary purpose of collecting data through Google Analytics is to analyze the performance of our portfolio website. This includes understanding user behavior, improving content, and enhancing user experience.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>User Rights</h2>
      <p style={{ fontSize: '2vh' }}>As we do not explicitly collect personal information, users are not required to exercise any specific rights related to their data. However, if you have concerns about the data collected by Google Analytics, you can refer to Google's privacy policy and settings.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Security</h2>
      <p style={{ fontSize: '2vh' }}>We take reasonable measures to secure the information collected through Google Analytics. However, please be aware that no method of transmission over the internet or electronic storage is entirely secure.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Cookies and Tracking</h2>

      <h4>Cookies</h4>
      <p style={{ fontSize: '2vh' }}>Cookies are small files stored on your device that assist in providing a better user experience. Google Analytics may use cookies to collect non-personal information.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Third-Party Links</h2>
      <p style={{ fontSize: '2vh' }}>Our portfolio website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Policy Updates</h2>
      <p style={{ fontSize: '2vh' }}>We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting the updated policy on this page.</p><br />



      <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>Contact Information</h2>
      <p style={{ fontSize: '2vh' }}>If you have any questions or concerns about this Privacy Policy, please contact us at <Link to="mailto:ppriyanshuchaurasia@gmail.com">ppriyanshuchaurasia@gmail.com</Link>.</p><br />



      <p style={{ fontSize: '2vh' }}>Thank you for visiting !</p><br />


    </div>
    </div>
  );
}
