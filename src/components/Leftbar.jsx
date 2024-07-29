import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cooking from "../assets/Cooking.jpg";
import CreateSpace from './CreateSpace';
import { Link } from 'react-router-dom';
import { useUser } from './UserProvider';
import { toast } from 'react-toastify';

const Leftbar = () => {
    const { theme } = useUser();
    const [communities, setCommunities] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const postCardStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    const notify=()=>{
        toast("Feature under Development",{autoClose:500})
    }

    const token = localStorage.getItem("token");

    const fetchCommunities = async () => {
        try {
            const res = await axios.get('https://academics.newtonschool.co/api/v1/quora/channel/?limit=8', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'tpibj7ie8i1w',
                }
            });
            const data = res.data;
            setCommunities(data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNewCommunity = () => {
        fetchCommunities(); // Refresh the list of communities
    };

    // Hide the Leftbar on screens smaller than 'lg' (1024px)
    if (windowWidth < 1024) {
        return null;
    }

    return (      
            <div className="fixed py-4 pl-4 mt-[5%] ml-[17%] w-[12%] lg:w-[10%] lg:ml-[16%] rounded-2xl " style={postCardStyle}>
                <div variant="h5" className="text-black mb-4">
                    <CreateSpace onNewCommunity={handleNewCommunity} />
                </div>
                <div className='' >
                    {communities.map((comm, idx) => (
                        <Link to="/ComingSoon" key={idx} className="text-[15px] hover:bg-gray-300 hover:rounded-md p-2 flex gap-2 bg-gray-300" style={postCardStyle}>
                            <img src={cooking} className="h-4 w-4" />
                            <div className="break-words">{comm.name}</div>
                        </Link>
                    ))}
                </div>
                <div className="mt-4" onClick={notify}>
                    <hr className="bg-blue-gray-400" />
                    <h1 className="mt-3 text-gray-500 text-sm" >About . Careers .</h1>
                    <h1 className="text-gray-500 text-sm">Terms . Privacy .</h1>
                    <h1 className="text-gray-500 text-sm">Acceptable Use</h1>
                    <h1 className="text-gray-500 text-sm">Terms . Privacy .</h1>
                </div>
            </div>
    );
};

export default Leftbar;