import React, { useEffect, useState } from 'react';
import avatar1 from '../media/Avatar/Avatar 1.webp';
import avatar2 from '../media/Avatar/Avatar 2.webp';
import avatar3 from '../media/Avatar/Avatar 3.webp';
import avatar4 from '../media/Avatar/Avatar 4.webp';
import avatar5 from '../media/Avatar/Avatar 5.webp';
import avatar6 from '../media/Avatar/Avatar 6.webp';
import avatar7 from '../media/Avatar/Avatar 7.webp';
import instagramlogo from '../media/Social icons/instagram-logo.png'
import githublogo from '../media/Social icons/github-logo.png'
import linkedinlogo from '../media/Social icons/linkedin-logo.png'
import whatsapplogo from '../media/Social icons/whatsapp logo.png'
import xlogo from '../media/Social icons/x-logo.png'
import { Link } from 'react-router-dom';

const avatar = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
];

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

    const { heading, array, mode } = props;

    const [arraylist, setarraylist] = useState([]);

    useEffect(() => {
        setarraylist(array);
    }, [array]);

    const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProfessionIndex((prevIndex) => (prevIndex + 1) % arraylist.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [arraylist.length]);

    const [randomAvatar] = useState(() => {
        const randomIndex = Math.floor(Math.random() * avatar.length);
        return avatar[randomIndex];
    });

    return (
        <div style={{ height: 'auto' }}>
            <div className="container" style={{ paddingTop: '5vh' }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex flex-column justify-content-center" style={{ paddingTop: '0vh' }} >
                        <div style={{ height: 'auto', color: mode === 'dark' ? 'white' : '#191919' }}>
                            <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '10vh' }}>
                                {heading}
                            </h1>
                            <div style={{height: '15vh'}}>
                            <p style={{ fontSize: '100%' }}>
                                {arraylist.map((profession, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            opacity: index === currentProfessionIndex ? 1 : 0,
                                            transition: 'opacity 1.5s ease-in-out',
                                            display: 'inline-block',
                                            paddingTop: '2vh',
                                            fontSize: '4vh'
                                        }}
                                    >
                                        {index === currentProfessionIndex ? profession : ''}
                                    </span>
                                ))}
                            </p>
                            </div>
                        </div>
                        <div className="d-flex" style={{ border: `${mode === 'dark' ? 'white' : 'black'} 0.25px solid`, padding: '1.5vh', height: '25%', marginTop: '10vh', width: 'fit-content', borderRadius: '2vh', background: mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)' }}>
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
                    <div className="col-md-6 d-flex flex-column align-items-center" style={{ height: 'auto', paddingTop: '0vh' }}>
                        <img src={randomAvatar} alt="Priyanshu" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
