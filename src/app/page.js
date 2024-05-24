'use client'
import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import dynamic from 'next/dynamic';
import Toolbar from "@/app/components/Toolbar";
import Login from "@/app/components/Login";
import Register from "@/app/components/Register";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const base_url = "http://127.0.0.1:5000/";

const Router = dynamic(() => import('react-router-dom').then(mod => mod.HashRouter), { ssr: false });

function CheckSession() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(base_url + '/check-session', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    navigate('/toolbar');
                } else {
                    navigate('/login');
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return null;
}

export default function Home() {
    return (
        <Router>
            <CheckSession />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/toolbar" element={<Toolbar />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}