import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {

    const navigate = useNavigate();

    return (
        <di className="w-full min-h-screen flex items-center justify-center bg-black">
            <h1 className="text-center text-3xl font-bold text-white">
                You dont have access to the content of this page. <span
                onClick={()=>navigate('/')}
                className='text-blue-500 underline italic cursor-pointer'
                >Go back to home.</span>
            </h1>
        </di>
    );
};

export default Forbidden;