import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
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
                    <div className={`form-check theme-switch form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`} >
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ paddingRight: '2.5vh', paddingLeft: '1vh', fontSize: '2vh' }}>Switch Mode</label>
                    </div>
                </div>

            </nav>
        </div>
    )
}
