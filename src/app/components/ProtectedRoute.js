import React, {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {Navigate, useNavigate} from 'react-router-dom';
import Toolbar from "@/app/components/Toolbar";
import config from '../config';

const base_url = config.baseUrl;

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

export default function ProtectedRoute() {
    const [cookies] = useCookies(['session']);

    if (cookies.session) {
        return <Toolbar />;
    } else {
        return <Navigate to="/login" />;
    }
}