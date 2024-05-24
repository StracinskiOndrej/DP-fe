'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const base_url = config.baseUrl;
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    const [serverResponse, setServerResponse] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRetypePasswordChange = (e) => {
        setRetypePassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== retypePassword) {
            alert("Passwords do not match!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email!");
            return;
        }

        // Create a new FormData object
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);

        // Send a POST request to the server
        fetch(base_url + '/register', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.status === 201) {
                    navigate('/login');
                }
                return response.json();
            }).then(data =>{
                if (data.error && data.status !== 201) {
                    alert(data.error);
                }
        })
            .catch(error => console.error('Error:', error));

    };

    return (
        <div className="flex flex-col items-center pt-20">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 h-128 w-64">
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" required className="w-full h-full text-black"/>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required className="w-full h-full text-black"/>
                <input type="password" value={retypePassword} onChange={handleRetypePasswordChange} placeholder="Retype Password" required className="w-full h-full text-black"/>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required className="w-full h-full text-black"/>
                <button type="submit" className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700">Register</button>
                <button onClick={handleBackToLogin} className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700 mt-4 text-black">Back to Login</button>
                <p>{serverResponse}</p>
            </form>
        </div>
    );
}