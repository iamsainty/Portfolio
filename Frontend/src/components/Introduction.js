import React, { useEffect, useState } from 'react';
import instagramlogo from '../media/Social icons/instagram-logo.png'
import githublogo from '../media/Social icons/github-logo.png'
import linkedinlogo from '../media/Social icons/linkedin-logo.png'
import whatsapplogo from '../media/Social icons/whatsapp logo.png'
import xlogo from '../media/Social icons/x-logo.png'
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
];

export default function Introduction(props) {

    const { heading, array } = props;

    const [arraylist, setarraylist] = useState([]);
    const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);

    useEffect(() => {
        setarraylist(array);
    }, [array]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProfessionIndex((prevIndex) => (prevIndex + 1) % arraylist.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [arraylist.length]);

    return (
        <div className="container" style={{paddingTop: '30vh'}}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '6vh', fontWeight: 'bolder', color: `${props.mode==='dark'?'white':'black'}` }}>{heading}</h1>
                <div style={{height: '20vh', paddingTop: '2vh', fontSize: '4vh', color: `${props.mode==='dark'?'white':'black'}` }}>
                    {arraylist.map((profession, index) => (
                        <span
                            key={index}
                            style={{
                                opacity: index === currentProfessionIndex ? 1 : 0,
                                transition: 'opacity 1.5s ease-in-out',
                                display: 'inline-block'
                            }}
                        >
                            {index === currentProfessionIndex ? profession : ''}
                        </span>
                    ))}
                </div>
            </div>
            <div className='d-flex justify-content-center'>
            {/* <Link to="/your-portfolio">
                <div className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} style={{height: '6vh', margin: '2vh'}}>
                Liked it, Hire Me
                </div>
                </Link> */}
                <div className="d-flex" style={{ border: 'black 0.25px solid', padding: '1.5vh', width: 'fit-content', borderRadius: '1vh', background: 'linear-gradient(125deg, #F0F4F8, #FAFAFA)', margin: '2vh' }}>
                    {social.map((socialmedia, index) => (
                        <Link key={index} to={socialmedia.link} style={{ marginLeft: index !== 0 ? '1rem' : '0' }}>
                            <img
                                src={socialmedia.logo}
                                style={{ height: '4vh', width: '4vh' }}
                                alt={`Social Media ${index + 1}`}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
