import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ paddingLeft: '2vh' }}><b>Priyanshu Chaurasiya</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i> {/* Font Awesome Icon for the toggler */}
                    </button>


                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" style={{ fontSize: '2vh', paddingLeft: '1vh' }}>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/about">About</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/education">Education</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/projects">Projects</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/blog">Blog</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
