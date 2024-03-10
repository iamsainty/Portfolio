import styled from 'styled-components';
import { Link } from 'react-router-dom';
import htmlcssjscoursera from '../../media/Certificates/html-css-js-coursera-certificate.jpeg';
import uiuxdesignwithfigma from '../../media/Certificates/ui-ux-design-with-figma-udemy-certificate.jpeg';
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Introduction from '../Introduction';


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



const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10vh;
  margin-bottom: 10vh;
  padding: 20px;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

export default function Projects(props) {
    useEffect(() => {
        document.title = `${props.title}`;
      }, [props.title]);
    let mode = props.mode;

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDownloadCertificate = (certificateUrl) => {
        const link = document.createElement('a');
        link.href = certificateUrl;
        link.download = 'certificate.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const certifications = [
        'HTML, CSS, and Javascript for Web Developers',
        'UI/UX Design With Figma'
    ]

    return (
        <>
            <div className='container'>
                <Introduction array={certifications} heading={"View Certifications"} mode={mode} />
                <div style={{ height: '20vh', width: '100%' }}></div>
                <Input
                    placeholder="Search certificate..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        marginBottom: '5vh',
                        width: '100%',
                        padding: '2vh',
                        background: 'linear-gradien(#DEE4EA, #F9FCFF)',
                        fontSize: '2vh',
                        border: '1px solid #191919'
                    }}
                />


                {certificates.filter((certificate) => certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    certificate.issuedby.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((certificate) => (
                    <Card
                        key={certificate.title}
                        style={{
                            background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)',
                            borderColor: props.mode === 'dark' ? 'white' : 'black',
                            border: '0.25px solid',
                            color: props.mode === 'dark' ? 'white' : '#191919',
                            maxWidth: '100%',
                            padding: '2.5vh',
                        }}
                    >
                        <div className="row g-0">
                            <div className="col-md-auto">
                                <Logo src={certificate.certificate} alt={`${certificate.title} logo`} style={{ height: '30vh', width: 'auto' }} />
                            </div>
                            <div className='col-md-8 text-left' style={{ padding: '2vh' }}>
                                <h2 style={{ fontSize: '3vh', fontWeight: 'bold' }}>{certificate.title}</h2>
                                <p style={{ marginTop: '2vh', fontSize: '2vh' }}>{certificate.time}</p>
                                <p style={{ marginTop: '0vh', fontSize: '2vh' }}>{certificate.issuedby}</p>
                                <p style={{ marginTop: '1vh', fontSize: '2vh' }}>{certificate.description}</p>
                            </div>
                        </div>
                        <div className="container text-center" style={{ paddingTop: '3vh' }}>
                            <div className="row align-items-center">
                                <div className="col-md-6 my-2 d-flex justify-content-center align-items-center">
                                    <Link to={certificate.verify} style={{ width: '100%' }}>
                                        <button type="button" className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} style={{ width: '100%' }}>
                                            &#10003; &nbsp; {certificate.verify === null ? "Verification not available" : 'Verify certificate'}
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-md-6 my-2 d-flex justify-content-center align-items-center">
                                    <div style={{ width: '100%' }}>
                                        <button
                                            type="button"
                                            className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`}
                                            style={{ width: '100%' }}
                                            onClick={() => handleDownloadCertificate(certificate.certificate)}
                                        >
                                            &darr; &nbsp; {certificate.live === null ? "PDF not available" : 'Download certificate'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}
