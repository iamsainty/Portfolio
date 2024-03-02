import React, { useEffect, useState } from 'react';
import priyanshucartoon from '../../media/priyanshu-cartoon-full.webp';
import instagramlogo from '../../media/instagram-logo.png'
import githublogo from '../../media/github-logo.png'
import linkedinlogo from '../../media/linkedin-logo.png'
import whatsapplogo from '../../media/whatsapp logo.png'
import xlogo from '../../media/x-logo.png'
import { Link } from 'react-router-dom';

const social = [
    {
        logo: instagramlogo,
        link: "https://www.instagram.com/iam__sainty"
    },
    {
        logo: whatsapplogo,
        link: "https://wa.me/918572937042"
    },
    {
        logo: githublogo,
        link: "https://github.com/iamsainty"
    },
    {
        logo: linkedinlogo,
        link: "https://www.linkedin.com/in/iamsainty/"
    },
    {
        logo: xlogo,
        link: "https://twitter.com/iam__sainty"
    },
]


export default function Introduction(props) {
    const professions = [' Developer', ' Designer', ' Programmer', ' Blogger'];
    const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProfessionIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [professions.length]);

    return (
        <div style={{ height: 'auto' }}>
            <div className="container" style={{ paddingTop: '5vh' }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex flex-column justify-content-center" style={{ paddingTop: '0vh' }} >
                        <div style={{ height: 'auto', color: props.mode === 'dark' ? 'white' : '#191919' }}>
                            <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '10vh' }}>
                                I'm Priyanshu Chaurasiya
                            </h1>
                            <p style={{ fontSize: '100%' }}>
                                {professions.map((profession, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            opacity: index === currentProfessionIndex ? 1 : 0,
                                            transition: 'opacity 1.5s ease-in-out',
                                            display: 'inline-block',
                                            fontSize: '4vh'
                                        }}
                                    >
                                        {index === currentProfessionIndex ? profession : ''}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="d-flex" style={{ border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid`, padding: '1.5vh', height: '25%', marginTop: '10vh', width: 'fit-content', borderRadius: '2vh', background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)' }}>
                            {social.map((socialmedia, index) => (
                                <Link key={index} to={socialmedia.link}>
                                    <img
                                        src={socialmedia.logo}
                                        style={{ height: '4vh', width: '4vh', marginRight: '2vh' }}
                                        alt={`Social Media ${index + 1}`}
                                    />
                                </Link>
                            ))}
                        </div>
                        <div
                        className="alert fade show"
                            role="alert"
                            style={{
                                border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid`,
                                padding: '2.5vh',
                                height: '25%',
                                marginTop: '10vh',
                                width: '100%',
                                borderRadius: '2vh',
                                background: 'linear-gradient(125deg, #25D366, #128C7E)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                            }}
                        >
                            <button
                                type="button"
                                className="btn-close d-flex align-items-center"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                style={{ height: '5vh' }}
                            >
                                <p style={{padding: '4vh', fontSize: '2vh', paddingTop: '6vh'}}>Close</p>
                            </button>


                            <div>
                                <strong>Loving this portfolio</strong>
                                <p>Get yours done</p>
                            </div>

                            <div className='d-flex align-items-center' style={{ border: '1px black solid', width: 'fit-content', paddingLeft: '2vh', paddingRight: '3vh', padding: '1vh', borderRadius: '2.5vh', background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)' }}>
                                <div className="col" style={{ maxWidth: 'fit-content' }}>
                                    <img src={whatsapplogo} alt="whatsapp logo" style={{ height: '4vh', width: '4vh' }} />
                                </div>
                                <div className="col align-item-center" style={{ paddingLeft: '2vh' }}>
                                    <Link to="https://wa.me/+918572937042?text=Your%20portfolio%20looks%20great%2C%20can%20you%20build%20the%20same%20for%20me" style={{ fontSize: '2vh', fontWeight: 'bold', textDecoration: 'none', color: props.mode === 'dark' ? 'white' : 'black' }}>Send a message</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* You can add the image here */}
                    <div className="col-md-6 d-flex flex-column align-items-center" style={{ height: 'auto', paddingTop: '0vh' }}>
                        <img src={priyanshucartoon} alt="Priyanshu" style={{ maxWidth: '100%', Height: '80vh' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
