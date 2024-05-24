'use client'
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const base_url = config.baseUrl;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email!");
            return;
        }

        if (!password) {
            alert("Password field is empty!");
            return;
        }

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // Send a POST request to the server
        fetch(base_url + '/login', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    navigate('/toolbar');
                } else {
                    return response.json();
                }
            })
            .then(data => {

                if (data && data.error) {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Error:', error));

    };

    const handleNewUser = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col items-center pt-20">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 h-128 w-64">
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required className="w-full h-full text-black"/>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required className="w-full h-full text-black"/>
                <button type="submit" className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700">Login</button>
                <button onClick={handleNewUser} className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700 mt-4">New User</button>
            </form>
        </div>
    );
}