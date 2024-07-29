import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { ProfileMenu } from './ProfileMenu';
import LanguageMenu from './LanguageMenu';
// import Subscription from './Subscription';
import Notification from './Notification';
import CreatePost from './CreatePost';
import { Answers, Following, Home, Notify, Spaces, Post, Answer } from './Icons';
import { useUser } from './UserProvider';
import quora from '../assets/QuoraNew.png';
import {
    Tooltip,
} from "@material-tailwind/react";
import Search from './Search';
import { RxDividerVertical } from "react-icons/rx";
import { toast } from 'react-toastify';


const NavbarDefault = () => {
    const { theme } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [openNav, setOpenNav] = useState(false);
    // const [query, setQuery] = useState('');
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const iconColor = {
    //     backgroundColor: theme === 'light' ? 'black' : "white"
    // }

    const postCardStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // const handleSearch = async (e) => {
    //     const searchTerm = e.target.value;
    //     setQuery(searchTerm);

    //     if (searchTerm.length > 0) {
    //         try {
    //             const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${searchTerm}"}`, {
    //                 headers: {
    //                     'projectID': 'tpibj7ie8i1w'
    //                 }
    //             });
    //             setSearchResults(response.data.data);
    //             console.log(response.data.data)
    //         } catch (error) {
    //             console.error("Error fetching search results:", error);
    //         }
    //     } else {
    //         setSearchResults([]);
    //     }
    // };

    // const nav = () => {
    //     navigate('/ComingSoon');
    // };

    const notify=()=>{
        toast("Feature under development",{autoClose:1000})
      }
    // const handlePostClick = (postId) => {
    //     navigate(`/post/${postId}`);
    // };

    // const handlePostClick = () => {
    //     navigate(`/ComingSoon`);
    // };


    return (
        <div className="w-full fixed z-10 lg:h-[8%] md:h-[5%] sm:h-[5%] flex" style={postCardStyle}>
            <div className="w-full justify-center text-gray-900 items-center hidden lg:flex shadow-md ">
                <div className="flex w-full md:w-max xs:flex-wrap justify-between">
                    <Link to="/home" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium ">
                        <img src={quora} className="w-40 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} />
                    </Link>
                    <div className='flex gap-4'>
                        <Link to="/home" activeClassName="text" className="cursor-pointer font-medium">
                            <Tooltip title="Home">
                                <Home className="w-8 h-8 md:w-6 md:h-6" style={postCardStyle} />
                            </Tooltip>
                        </Link>
                        <Link to="/following" activeClassName="text-red-800" className="cursor-pointer font-medium">
                            <Tooltip title="Post">
                                <Following className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <Link to="/Answers" activeClassName="text-red-800" className="cursor-pointer font-medium">
                            <Tooltip title="Answers">
                                <Answers className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <Link to="/SpaceList" activeClassName="text-red-800" className="cursor-pointer font-medium">
                            <Tooltip title="Spaces">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <div activeClassName="text-red-800" className="cursor-pointer font-medium">
                            <h1 className="lg:pr-2"><Notification /></h1>
                        </div>
                    </div>
                    <div className="flex">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="h-7 w-20 p-2 ml-2 mt-1 cursor-pointer font-medium text-sm border border-[#575757] rounded-full flex items-center" style={postCardStyle} onClick={notify}>
                        TryQuora+
                    </div>
                    <div className="cursor-pointer font-medium rounded-full">
                        <ProfileMenu />
                    </div>
                    <div className="cursor-pointer font-medium mr-4 ">
                        <LanguageMenu />
                    </div>
                    <div class="flex items-center rounded-full bg-red-800">
                        <button class="relative flex items-center justify-center h-7 text-white rounded-l-full pl-3 cursor-pointer">
                            <CreatePost text={"Add Question"} />
                        </button>

                        <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
                        <button class="relative flex items-center justify-center h-7 text-white rounded-r-full pr-2 cursor-pointer">
                            <svg class="w-4 h-4 stroke-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8.5l7 7 7.005-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* for small screens */}
            <div className="fixed z-20 lg:mx-auto flex xs:flex-col-2 text-gray-900 mb-4 lg:ml-32 lg:gap-2 lg:hidden bg-gray-200 w-[100%] !important">
                <div className="flex w-[100%]important md:w-[90%]">
                    <div activeClassName="text-red-800" className="mx-4 cursor-pointer py-1.5 font-medium w-[30%]!important">
                        <img src={quora} className="w-36 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </div>
                    <div className="w-[40%]!important my-[3%] xs:my-auto md:w-[100%]" >
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="xs:block lg:hidden md:hidden w-[30%]!important">
                        <button onClick={toggleMenu} className="p-2 pl-6 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-10 left-0 w-full bg-gray-200 shadow-lg rounded-lg flex">
                        <Link to="/home" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                            <Tooltip title="Home">
                                <Home className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <Link to="/following" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                            <Tooltip title="Post">
                                <Post className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <Link to="/Answers" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                            <Tooltip title="Answers">
                                <Answer className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <Link to="/SpaceList" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                            <Tooltip title="Spaces">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                        <div className="block px-1 py-2 text-gray-900 cursor-pointer">
                            <ProfileMenu />
                        </div>
                        <div className="flex px-1 py-2 text-gray-900 cursor-pointer flex-wrap">
                            <h1 className="bg-red-800 rounded-full text-md text-white w-32  h-8 lg:hidden flex items-center justify-center">
                                <CreatePost text={"Add Question"} />
                            </h1>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarDefault;
