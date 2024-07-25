import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import {useAuth} from '../context/AuthContext.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/new-operation');
        }
    }, [user, navigate]);

    return (

        <div className="min-h-screen flex flex-col">
            <ParticlesBackground/>
            <div className="flex-grow flex items-center justify-center">
                <AuthForm/>
            </div>
        </div>
    );
};

export default LoginPage;
