import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const host=process.env.host;

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
            const response = await fetch(`${host}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: credentials.username, password: credentials.password }),
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('token', json.token); // Use token instead of authtoken
                navigate('/admin');
            } else {
                setMsg(json.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMsg('An error occurred. Please try again later.');
        }
    };    
    useEffect(() => {
        const fetchUser = async () => {
          if (localStorage.getItem('token')) {
            navigate('/admin');
          }
        };
        fetchUser();
      }, [navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ paddingTop: '35vh', paddingBottom: '25vh' }}>
            <div className="row align-items-center justify-content-center">
                    <div style={{ maxWidth: '45vh'}}>
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
                        </form>
                    </div>
            </div>
        </div>
    );
};

export default Login;
