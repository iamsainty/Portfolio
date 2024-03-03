import React from 'react';
import styled from 'styled-components';
import linkedinlogo from '../../media/Social icons/linkedin-logo.png';
import githublogo from '../../media/Social icons/github-logo.png';
import xlogo from '../../media/Social icons/x-logo.png';
import instagramlogo from '../../media/Social icons/instagram-logo.png';
import whatsapplogo from '../../media/Social icons/whatsapp logo.png';
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
    <div style={{ paddingBottom: '10vh' }}>
      <h2 className="text-center my-5" style={{ fontSize: '5vh', fontWeight: 'bold', color: props.mode === 'dark' ? 'white' : '#191919' }}>
        Contact
      </h2>
      <div className="container align-item-center">
        <div className="row">
          <div className="col" style={{maxWidth: '100%'}}>
            {sociallinks.map((social) => (
              <Link to={`${social.link}`} style={{ textDecoration: 'none', color: 'black' }} key={social.platform}>
                <Card style={{ color: props.mode === 'dark' ? 'white' : '#191919', background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)', border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid` }}>
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
          <div className="col-lg-6 d-flex flex-column text-center" style={{ height: 'auto', width: 'auto' }}>
            <div
              className="alert fade show"
              role="alert"
              style={{
                border: `${props.mode === 'dark' ? 'white' : 'black'} 0.25px solid`,
                padding: '4vh',
                height: '100%',
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
                <p style={{ padding: '4vh', fontSize: '2.5vh', paddingTop: '6vh' }}>Close</p>
              </button>


              <div className='text-start' >
                <strong style={{fontSize: '5vh'}}>Loving this portfolio</strong>
                <p style={{fontSize: '4vh', paddingTop: '3vh'}}>Get yours done</p>
              </div>
              <Link to="/your-portfolio" style={{ fontSize: '2vh', fontWeight: 'bold', textDecoration: 'none', color: props.mode === 'dark' ? 'white' : 'black' }}>
              <div className='d-flex align-items-center' style={{ border: '1px black solid', width: 'fit-content', paddingLeft: '2vh', paddingRight: '3vh', padding: '1vh', borderRadius: '2.5vh', background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)' }}>
                <div className="col" style={{ maxWidth: 'fit-content' }}>
                  {/* <img src={whatsapplogo} alt="whatsapp logo" style={{ height: '4vh', width: '4vh' }} /> */}
                </div>
                <div className="col align-item-center" style={{ paddingLeft: '2vh', paddingRight: '2vh'}}>
                  Know More
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
