import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import Loading from '../Loading';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');  // Clear any previous messages
        setLoading(true); // Set loading state
        try {
            if (credentials.username === '') {
                setMsg('Enter your username');
                setLoading(false); // Clear loading state
                return;
            }
            const pattern = /^[a-z0-9]+$/;
            if (!pattern.test(credentials.username)) {
                setMsg('Username should contain only lowercase alphabets and numbers');
                setLoading(false); // Clear loading state
                return;
            }
            if (credentials.password === '') {
                setMsg('Enter your password');
                setLoading(false); // Clear loading state
                return;
            }
            const error = await login(credentials.username, credentials.password);
            if (error) {
                setMsg(error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Clear loading state
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
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}>
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
                                aria-describedby="usernameHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={handleChange}
                                value={credentials.password}
                                placeholder='Your password'
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '0.75rem'
                                }}
                                name='password'
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
                                Login
                            </button>
                        )}
                        <p style={{
                            fontSize: '1rem',
                            textAlign: 'center',
                            marginTop: '1.5rem'
                        }}>
                            Don't have an account? <Link to='/register' style={{ color: '#333', textDecoration: 'underline' }}>Register now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
