import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-light bg-light`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ paddingLeft: '2vh' }}><b>Priyanshu</b></Link>


                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" style={{ fontSize: '2vh', paddingLeft: '1vh' }}>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/about">About</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/projects">Projects</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/certifications">Certifications</Link></li>
                            <li className="nav-item" style={{ paddingLeft: '1vh' }}>
                                <Link className="nav-link" to="/blog">Blog</Link></li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    )
}
