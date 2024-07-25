import React from 'react'
import { Link } from 'react-router-dom';

const Navigateto = [
    { page: "Home", link: "/" },
    { page: "Projects", link: "/projects" },
    { page: "Certifications", link: "/certifications" },
    { page: "Blog", link: "/blog" }
];

const Contactme = [
    {
        platform: "Phone",
        value: " +91 8572937042",
        link: "tel:+918572937042"
    },
    {
        platform: "E-Mail",
        value: "ppriyanshuchaurasia@gmail.com",
        link: "mailto:ppriyanshuchaurasia@gmail.com"
    }
]

const Connectme = [
    {
        page: "Instagram",
        link: "https://www.instagram.com/iam__sainty"
    },
    {
        page: "X (Twitter)",
        link: "https://twitter.com/iam__sainty"
    },
    {
        page: "Linkedin",
        link: "https://www.linkedin.com/in/iamsainty/"
    },
    {
        page: "GitHub",
        link: "https://github.com/iamsainty"
    },
    {
        page: "WhatsApp",
        link: "https://wa.me/918572937042"
    }
]

const pages=[
    {
        page: "About",
        link: "/about"
    },
    {
        page: "Disclaimer",
        link: "/disclaimer"
    },
    {
        page: "Privacy Policy",
        link: "/privacy-policy"
    },
    {
        page: "GDPR Compliance",
        link: "/gdpr-compliance"
    }
]

export default function Footer(props) {
    return (
        <div style={{ background: 'white', color: '#191919', marginTop: '0vh', paddingTop: '8vh', paddingBottom: '10vh' }}>
            <div className="container text-left">
                <div className="row align-items-start">
                    <div className="col" style={{ margin: '5vh' }}>
                        <h2 style={{ fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh' }}>Navigate to</h2>
                        <ul className="list-group list-group-flush">
                            {Navigateto.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh' }}>
                                    <Link to={link.link} style={{ textDecoration: 'none', color: '#191919' }}>{link.page}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col" style={{ margin: '5vh' }}>
                        <h2 style={{ fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh' }}>Contact Me</h2>
                        <ul className="list-group list-group-flush">
                            {Contactme.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh', color: '#191919' }}>
                                    <Link to={link.link} style={{ textDecoration: 'none', color: '#191919' }}>{link.platform}<br />{link.value}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col" style={{ margin: '5vh' }}>
                        <h2 style={{ fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh' }}>Connect Me</h2>
                        <ul className="list-group list-group-flush">
                            {Connectme.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh', color: '#191919' }}>
                                    <Link to={link.link} style={{ textDecoration: 'none', color: '#191919' }}>{link.page}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col" style={{ margin: '5vh' }}>
                        <h2 style={{ fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh' }}>Legal Pages</h2>
                        <ul className="list-group list-group-flush">
                            {pages.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh' }}>
                                    <Link to={link.link} style={{ textDecoration: 'none', color: '#191919' }}>{link.page}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container'>
                <p style={{fontSize: '1.75vh', paddingLeft: '5vh'}}>&copy; 2024 by Priyanshu Chaurasiya is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1">Attribution-NonCommercial-NoDerivatives 4.0 International </a></p>
                <p style={{fontSize: '1.75vh', paddingLeft: '5vh'}}>Designed and Developed with &hearts; by Priyanshu Chaurasiya</p>
            </div>
        </div>
    );
}
