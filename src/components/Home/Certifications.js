import React from 'react';
import styled from 'styled-components';
import htmlcssjscoursera from '../../media/html-css-js-coursera-certificate.jpeg';
import uiuxdesignwithfigma from '../../media/ui-ux-design-with-figma-udemy-certificate.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const certificates = [
    {
        "title": "HTML, CSS, and Javascript for Web Developers",
        "certificate": htmlcssjscoursera,
        "issuedby": "Coursera",
        "time": "2 February 2023",
        "verify": "https://www.coursera.org/verify/HTD8SACQUS55"
    },
    {
        "title": "UI/UX Design With Figma",
        "certificate": uiuxdesignwithfigma,
        "issuedby": "Udemy",
        "time": "1 September 2022",
        "verify": "https://www.udemy.com/certificate/UC-1919a52b-b419-4670-b6a1-b67961609adb"
    }
];

const CertificateContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const CertificateCard = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding-bottom: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function Certifications(props) {

    return (
        <CertificateContainer>
            <h2 className='text-center my-5' style={{ fontSize: '5vh', fontWeight: 'bold', color: props.mode==='dark'?'white': 'black'}}>Certifications</h2>

            <div className="container text-center my-5">
                <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={1}
                    responsive={[
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                    ]}>
                    {certificates.map((certificate, index) => (
                        <div className="col" key={index}>
                            <Link to={`${certificate.verify}`} style={{ textDecoration: 'none', color: 'black' }} key={certificate.verify}>
                                <CertificateCard style={{background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)', border: `${props.mode==='dark'? 'white': 'black'} 0.25px solid`, color: props.mode==='dark'?'white':'#191919'}}>
                                    <img src={certificate.certificate} className="card-img-top" alt={`${certificate.title} Preview`} />
                                    <div className="card-body my-3">
                                        <h2 style={{ margin: '0.5vh', fontSize: '2vh', fontWeight: 'bold' }}>{certificate.title}</h2>
                                        <p className="card-text" style={{ margin: '0.5vh', fontSize: '1.75vh' }}>{certificate.issuedby}</p>
                                        <p className="card-text" style={{ margin: '0.5vh', fontSize: '1.75vh' }}>{certificate.time}</p>
                                    </div>
                                </CertificateCard>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </CertificateContainer>
    );
}
