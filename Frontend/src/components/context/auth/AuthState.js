import React, { useState } from 'react';
import authContext from './authContext';
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const navigate = useNavigate();

    const host = 'https://hey-sainty-backend.vercel.app';
    // const host = 'http://localhost:5002';

    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const url = `${host}/auth/userdetails`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('hey-sainty-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
            } else {
                console.error('Error fetching user details', data);
            }
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch(`${host}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('hey-sainty-token', data.token);
                navigate('/admin');
            } else {
                console.error('Error logging in', data);
                return data.message || 'Login failed';
            }
        } catch (error) {
            console.error('Error logging in', error);
            return 'An error occurred. Please try again later.';
        }
    };

    const register = async (name, username, password) => {
        try {
            const response = await fetch(`${host}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('hey-sainty-token', data.token);
                navigate('/admin');
            } else {
                console.error('Error registering', data);
                return data.message || 'Registration failed';
            }
        } catch (error) {
            console.error('Error registering', error);
            return 'An error occurred. Please try again later.';
        }
    };

    return (
        <authContext.Provider value={{ user, fetchUser, login, register }}>
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
