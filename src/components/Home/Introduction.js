import React, { useEffect, useState } from 'react';
import priyanshuimage from '../../media/priyanshu.png';
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


export default function Introduction() {
    const professions = [' Developer', ' Designer', ' Programmer', ' Blogger'];
    const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProfessionIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [professions.length]);

    return (
        <div style={{ height: '100vh' }}>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 d-flex flex-column justify-content-center" >
                        <div style={{ height: 'auto' }}>
                            <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '10vh'}}>
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
                        <div className='d-flex' style={{border: 'black 1.5px solid', padding: '1.5vh', height: '25%', marginTop: '10vh', width: 'fit-content', borderRadius: '2vh'}}>
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

                    </div>
                    {/* You can add the image here */}
                    <div className="col-md-6 d-flex flex-column align-items-center" style={{ height: 'auto' }}>
                        <img src={priyanshuimage} alt="Priyanshu" style={{ maxWidth: '75%', height: 'auto' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
