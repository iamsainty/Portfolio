import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import Loading from '../Loading';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", username: "", password: "", cnfpassword: "" });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(authContext);

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

        setLoading(true); // Set loading state

        try {
            const error = await register(name, username, password);
            if (error) {
                setMsg(error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Clear loading state
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
            <div className="row align-items-center justify-content-center" style={{maxWidth: '95%', width: '60vh'}}>
                <div style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        color: '#333'
                    }}>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={handleChange}
                                value={credentials.name}
                                name='name'
                                placeholder='Your Name'
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '0.75rem',
                                    marginBottom: '1rem'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                onChange={handleChange}
                                value={credentials.username}
                                name='username'
                                placeholder='Username'
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '0.75rem',
                                    marginBottom: '1rem'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={handleChange}
                                value={credentials.password}
                                placeholder='Your Password'
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '0.75rem',
                                    marginBottom: '1rem'
                                }}
                                name='password'
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="cnfpassword"
                                onChange={handleChange}
                                value={credentials.cnfpassword}
                                placeholder='Confirm Password'
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '0.75rem'
                                }}
                                name='cnfpassword'
                            />
                        </div>
                        <div style={{ color: 'red', paddingBottom: '1rem', textAlign: 'center' }}>{msg}</div>
                        {loading ? (
                            <Loading />
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-dark"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    color: '#fff',
                                    backgroundColor: '#333'
                                }}
                            >
                                Register
                            </button>
                        )}
                        <p style={{
                            fontSize: '1rem',
                            textAlign: 'center',
                            marginTop: '1.5rem'
                        }}>
                            Already have an account? <Link to='/login' style={{ color: '#333', textDecoration: 'underline' }}>Login now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
