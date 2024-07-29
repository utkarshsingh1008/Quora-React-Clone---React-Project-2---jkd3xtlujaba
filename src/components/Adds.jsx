import React, { useState, useEffect } from 'react';
import adds from '../assets/Adds.jpg';
import adds1 from '../assets/Adds1.jpg';

const Adds = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (windowWidth < 1024) { // Adjust this value based on the Tailwind CSS breakpoint you want to use
        return null;
    }

    return (
        <div className='border bg-gray-300 fixed mt-[5%] left-[73%] w-[12%] h-[50%] rounded-md'>
            <div className='w-100 h-100'>
                <img src={adds} className='w-80 h-50 p-2' />
            </div>
            <div>
                <img src={adds1} className='w-80 h-50 p-2' />
            </div>
            <div className='text-center border bg-blue-gray-50'>
                Advertisement
            </div>
        </div>
    );
}

export default Adds;
