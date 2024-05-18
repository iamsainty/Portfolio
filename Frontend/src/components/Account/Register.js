import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", username: "", password: "", cnfpassword: "" });
    const [msg, setMsg] = useState('');
    let navigate = useNavigate();

    const host = process.env.host;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, password, cnfpassword } = credentials;

        // Add form validation logic
        if (!name || !username || !password || !cnfpassword) {
            setMsg('All fields are required.');
            return;
        }
        if (password !== cnfpassword) {
            setMsg('Passwords do not match.');
            return;
        }

        const response = await fetch(`${host}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, username, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/admin');
            window.location.reload();
        } else {
            setMsg('Username already exists!');
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };



    return (
        <div className="container" style={{ paddingTop: '35vh', paddingBottom: '25vh' }}>
            <div className="row align-items-center justify-content-center">
                <div style={{ maxWidth: '45vh' }}>
                    <h1 style={{ fontSize: '5vh', fontWeight: 'bolder', paddingTop: '0vh', paddingBottom: '3vh' }}>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" style={{ border: '1px black solid', padding: '1vh' }} placeholder='your name' className="form-control" id="name" onChange={handleChange} value={credentials.name} name='name' />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="username" onChange={handleChange} value={credentials.username} name='username' style={{ border: '1px black solid', padding: '1vh' }} placeholder='username' />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} style={{ border: '1px black solid', padding: '1vh' }} placeholder='your password' name='password' />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="cnfpassword" onChange={handleChange} value={credentials.cnfpassword} style={{ border: '1px black solid', padding: '1vh' }} placeholder='confirm password' name='cnfpassword' />
                        </div>
                        <div style={{ color: 'red', paddingBottom: '2vh' }}>{msg}</div>
                        <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Register</button>
                        <p style={{ fontSize: '1.75vh', paddingTop: '2.5vh' }}>Have an account ? <Link to='/login'>Login now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
