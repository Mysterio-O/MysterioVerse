import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';

const Logout = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('signed out');
                navigate('/')
            })
            .catch(err => {
                console.log('error signing out', err);
            })
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-black'>
            <button
                onClick={() => handleLogOut()}
                className='btn btn-outline bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-800'>
                Sign Out
            </button>
        </div>
    );
};

export default Logout;