import React from 'react';
import styled from 'styled-components';
import linkedinlogo from '../../media/linkedin-logo.png';
import githublogo from '../../media/github-logo.png';
import xlogo from '../../media/x-logo.png';
import instagramlogo from '../../media/instagram-logo.png';
import whatsapplogo from '../../media/whatsapp logo.png';
import { Link } from 'react-router-dom';

const sociallinks = [
  {
    platform: 'Linkedin',
    icon: linkedinlogo,
    link: "https://www.linkedin.com/in/iamsainty/",
    username: "@iamsianty"
  },
  {
    platform: 'Github',
    icon: githublogo,
    link: "https://github.com/iamsainty",
    username: "@iamsianty"
  },
  {
    platform: 'X (Twitter)',
    icon: xlogo,
    link: "https://twitter.com/iam__sainty",
    username: "@iam__sainty"
  },
  {
    platform: 'Instagram',
    icon: instagramlogo,
    link: "https://www.instagram.com/iam__sainty",
    username: "@iam__sainty"
  },
  {
    platform: 'WhatsApp',
    icon: whatsapplogo,
    link: "https://wa.me/918572937042",
    username: "+91 8572937042"
  }
];

// const connectquotes = [
//   'Networking is the key to success.',
//   'We are on a journey of collaboration',
//   'The power of connection fuels innovation',
//   'Every connection is a step towards greatness',
// ];



const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

export default function Contact(props) {

  return (
    <div style={{paddingBottom: '10vh'}}>
      <h2 className="text-center my-5" style={{ fontSize: '5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'}}>
        Contact
      </h2>
      <div className="container align-item-center">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column text-center" style={{ height: '60vh' }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh', textalign: 'center'}}>
            <blockquote className="blockquote" style={{ fontSize: '4vh', maxWidth: '100%', color: props.mode==='dark'?'white':'#191919' }}>
              Networking is the key <b/>to success.
              </blockquote>
              </div>

            <h2 style={{ fontSize: '8vh', fontWeight: 'bold', color: props.mode==='dark'?'white':'#191919' }}>Let's Connect</h2>
            


          </div>
          <div className="col">
            {sociallinks.map((social) => (
              <Link to={`${social.link}`} style={{ textDecoration: 'none', color: 'black' }} key={social.platform}>
                <Card style={{color: props.mode==='dark'?'white':'#191919', background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)', border: `${props.mode==='dark'? 'white': 'black'} 0.25px solid`}}>
                  <div style={{ display: 'flex' }}>
                    <Logo src={social.icon} alt={`${social.platform} logo`} style={{ height: '5vh', width: 'auto' }} />
                    <div className='text-left'>
                      <h2 style={{ fontSize: '1.75vh', fontWeight: 'bold' }}>{social.platform}</h2>
                      <p style={{ margin: '0.5vh', fontSize: '1.75vh' }}>{social.username}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
