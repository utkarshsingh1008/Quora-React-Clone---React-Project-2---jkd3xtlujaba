import React, { useState } from 'react';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import Adds from './Adds';
import { useUser } from './UserProvider';
import NavbarDefault from './NavbarDefault';

const Home = () => {
    const { theme } = useUser();
    const colour = {
        backgroundColor: theme === 'light' ? 'rgb(241, 242, 242)' : 'black'
    };

    // const [query, setQuery] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    return (
        <>
            <NavbarDefault />
            <div className='flex' style={colour}>
            <Leftbar />
            <Rightbar />
            <Adds />
            </div>
        </>
    );
};

export default Home;
