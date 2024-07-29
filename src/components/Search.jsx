import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";   
import { useUser } from './UserProvider';
import { useNavigate } from 'react-router-dom';

const Search = ({ theme, searchResults, setSearchResults }) => {
    const { setPostId } = useUser();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate=useNavigate();

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setSearchQuery(searchTerm);
        setPostId(null);
        if (searchTerm.length > 0) {
            try {
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${searchTerm}"}`, {
                    headers: {
                        'projectID': 'tpibj7ie8i1w', 
                    }
                });
                setSearchResults(response.data.data || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    // const handleCancel = () => {
    //     setSearchQuery('');
    //     setSearchResults([]);
    // };

    const searchBoxStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'transparent',
        color: theme === 'light' ? 'black' : 'black',
    };

    const goToPost = (id) => {
        setPostId(id);
        // console.log(id);
        setSearchQuery('');
        setSearchResults([]);
        navigate('/home');
        // window.location.reload();
    };

    return (
        <div style={searchBoxStyle}>
            <div className='flex items-center border border-[#DEE0E1] h-6 lg:h-8 w-50 lg:w-80 rounded-md relative'>
                <div className='flex gap-1 ml-2 items-center flex-grow'>
                    <IoIosSearch className='text-gray-600 h-5 w-5 cursor-pointer' />
                    <input
                        type='search'
                        id='searchInput'
                        placeholder='Search'
                        className='bg-transparent focus:outline-none lg:w-[250px] text-gray-600 font-light text-base lg:text-base flex-grow xs:w-[100px]'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                {/* {searchQuery && (
                    <button
                        onClick={handleCancel}
                        className='text-gray-600 h-5 w-5 cursor-pointer absolute right-2 lg:hidden md:hidden'
                    >
                        
                    </button>
                )} */}
            </div>
            {searchQuery && searchResults.length > 0 ? (
                <div className="absolute top-12 bg-white shadow-lg rounded-lg mt-2 p-4 max-h-72 mr-[15%] w-[500px] overflow-auto z-20 text-ellipsis">
                    {searchResults.map((result, index) => (
                        <div key={index} className="p-2 border-b last:border-b-0" onClick={() => { goToPost(result._id)}}>
                            <h2 className='font-bold'>{result?.title}</h2>
                            <p>{result?.content.length > 90 ? `${result.content.slice(0, 90)}...` : result.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                searchQuery && (
                    <div className="absolute top-12 text-justify bg-white shadow-lg rounded-lg mt-2 p-4 max-h-72 overflow-scroll w-[500px] text-ellipsis z-20">
                        <p className="text-black font-bold">No results found.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Search;
