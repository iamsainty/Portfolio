import React from 'react';
import priyanshucartoon from '../../media/priyanshu-cartoon-thinking.webp';
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


export default function BlogIntro(props) {

    return (
        <div className='container' style={{ height: 'auto' }}>
            <div className="container" style={{ paddingTop: '5vh' }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex flex-column justify-content-center" style={{ paddingTop: '0vh' }} >
                        <div style={{ height: 'auto', color: props.mode === 'dark' ? 'white' : '#191919' }}>
                            <h1 style={{ fontSize: '7vh', fontWeight: 'bolder', paddingTop: '10vh' }}>
                                Blog
                            </h1>
                            <p style={{ fontSize: '2.25vh', paddingTop: '5vh' }}>
                            Embark on a visual journey through the tapestry of my creativity, where innovation meets passion, and every project tells a unique story.                            </p>
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
                        

                    </div>
                    {/* You can add the image here */}
                    <div className="col-md-6 d-flex flex-column align-items-center" style={{ height: 'auto', marginTop: '2vh' }}>
                        <img src={priyanshucartoon} alt="Priyanshu" style={{ maxWidth: '100%', Height: '80vh' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
