import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar1 from '../../media/Avatar/Avatar 1.webp';
import avatar2 from '../../media/Avatar/Avatar 2.webp';
import avatar3 from '../../media/Avatar/Avatar 3.webp';
import avatar4 from '../../media/Avatar/Avatar 4.webp';
import avatar5 from '../../media/Avatar/Avatar 5.webp';
import avatar6 from '../../media/Avatar/Avatar 6.webp';
import avatar7 from '../../media/Avatar/Avatar 7.webp';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (credentials.username === '') {
                setMsg('Enter your username');
                return;
            }
            const pattern = /^[a-z0-9]+$/;
            if (!pattern.test(credentials.username)) {
                setMsg('Username should contain only lowercase alphabets and numbers');
                return;
            }
            if (credentials.password === '') {
                setMsg('Enter your password');
                return;
            }
            const response = await fetch("http://localhost:5002/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: credentials.username, password: credentials.password }),
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('token', json.authtoken);
                navigate('/admin');
                window.location.reload();
            } else {
                setMsg(json.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMsg('An error occurred. Please try again later.');
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const avatar = [
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
    ];
    const randomAvatar = avatar[Math.floor(Math.random() * avatar.length)];

    return (
        <div className="container" style={{ paddingTop: '15vh' }}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <div style={{ width: '80%', marginLeft: '10%' }}>
                        <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '0vh', paddingBottom: '3vh' }}>
                            Login
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="username" onChange={handleChange} value={credentials.username} name='username' placeholder='Username' style={{ border: '1px black solid', padding: '1vh' }} aria-describedby="usernameHelp" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} placeholder='Your password' style={{ border: '1px black solid' }} name='password' />
                            </div>
                            <div style={{ color: 'red', paddingBottom: '1vh' }}>{msg}</div>
                            <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Login</button>
                            <p style={{ fontSize: '1.75vh', paddingTop: '2.5vh' }}>Don't have an account? <Link to='/register'>Register now</Link></p>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                    <img src={randomAvatar} alt="Avatar" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>
        </div>
    );
};

export default Login;
