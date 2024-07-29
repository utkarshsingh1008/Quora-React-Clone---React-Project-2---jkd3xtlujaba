import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import GetComments from './GetComments';
import { useUser } from './UserProvider';
import 'react-toastify/dist/ReactToastify.css';
import NavbarDefault from './NavbarDefault';

const Answers = () => {
  
    const { theme } = useUser();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState({});
  
    const colour = {
      backgroundColor: theme === 'light' ? 'white' : 'black',
      color: theme === 'light' ? 'black' : 'white'
    };
  
    const inputStyle = {
      backgroundColor: theme === 'light' ? 'white' : '#333',
      color: theme === 'light' ? 'black' : 'white',
    };
  
    const postCardStyle = {
      backgroundColor: theme === 'light' ? 'white' : 'gray',
      color: theme === 'light' ? 'black' : 'white',
    };
  
    const fetchPosts = async () => {
      const dataUser = localStorage.getItem("token");
      try {
        const response = await axios.get('https://academics.newtonschool.co/api/v1/quora/post?limit=100', {
          headers: {
            'projectID': 'tpibj7ie8i1w',
            'Authorization': `Bearer ${dataUser}`
          }
        });
        setPosts(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
  
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    return (
      <>
      <NavbarDefault/>
        <div className='' style={colour}>
            <div className='flex items-center flex-col'>
            <h1 className='font-bold text-black text-left mt-[5%]'>Answers for you</h1>
              {posts.map((post, index) => {
                const authorInitial = post.author?.name ? post.author?.name.charAt(0).toUpperCase() : '';
                return (
                  <div className="relative flex flex-col  text-gray-700 bg-white shadow-md bg-clip-border rounded-xl xl:w-[40rem] lg:w-[50rem] md:w-[26rem] w-full " key={index} style={postCardStyle}>
                    <div className='flex items-center p-2'>
                      {post.channel?.image ? (
                        <img className="w-8 h-8 rounded-full" src={post.channel?.image} />
                      ) : (
                        <Avatar round size="25" className="mt-0.5 ml-2" name={authorInitial} />
                      )}
                      <h1 className='ml-5 font-semibold'>{post.author?.name}</h1>
                    </div>
                    <div className="p-6">
                      <h5 className="block mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-black" >
                        {post?.title}
                      </h5>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        {post?.content}
                      </p>
                    </div>
                    <GetComments postId={post?._id} likeCount={post?.likeCount} commentCount={post?.commentCount} />
                  </div>
                )
              })}
            </div>         
        </div>
  
  
      </>
  )
}

export default Answers;
