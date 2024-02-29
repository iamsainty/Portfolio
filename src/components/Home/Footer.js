import React from 'react'
import { Link } from 'react-router-dom';

const Navigateto = [
    { page: "Home", link: "/" },
    { page: "Education", link: "/education" },
    { page: "Projects", link: "/projects" }
];

const Contactme = [
    {
        platform: "Phone",
        value: " +91 8572937042",
        link: "/path"
    },
    {
        platform: "E-Mail",
        value: "ppriyanshuchaurasia@gmail.com",
        link: "/path"
    }
]

const Connectme = [
    {
        page: "Instagram",
        link: "/path"
    },
    {
        page: "X (Twitter)",
        link: "/path"
    },
    {
        page: "Linkedin",
        link: "/path"
    },
    {
        page: "GitHub",
        link: "/path"
    },
]

export default function Footer() {
    return (
        <div className='bg-body-tertiary' style={{marginTop: '7vh', paddingTop: '8vh', paddingBottom: '10vh' }}>
            <div className="container text-left">
                <div className="row align-items-start">
                    <div className="col" style={{margin: '5vh'}}>
                        <h2 style={{fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh'}}>Navigate to</h2>
                        <ul className="list-group list-group-flush">
                            {Navigateto.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh'}}>
                                    <Link to={link.link} style={{ textDecoration: 'none', color: 'black' }}>{link.page}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col" style={{margin: '5vh'}}>
                        <h2 style={{fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh'}}>Contact Me</h2>
                        <ul className="list-group list-group-flush">
                            {Contactme.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh'}}>
                                    {link.platform}<br/>{link.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col" style={{margin: '5vh'}}>
                        <h2 style={{fontSize: '3vh', fontWeight: 'bold', margin: '1vh', marginBottom: '2vh'}}>Connect Me</h2>
                        <ul className="list-group list-group-flush">
                            {Connectme.map((link, index) => (
                                <li key={index} className="list-group-item" style={{ background: 'transparent', fontSize: '2vh' }}>
                                    {link.page}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
