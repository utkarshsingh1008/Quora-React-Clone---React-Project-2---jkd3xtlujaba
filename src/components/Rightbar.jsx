import React, { useEffect, useState, useCallback } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import GetComments from './GetComments';
import CreatePost from './CreatePost';
import { useUser } from './UserProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Ask, Answer, Post } from './Icons';
import AddPost from './AddPost';
import { toast } from 'react-toastify';

const Rightbar = () => {
  const { theme, show, setShow, postId } = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  const fetchPosts = async (pageToFetch) => {
    if (isFetching) return;

    const dataUser = localStorage.getItem("token");
    try {
      setIsFetching(true);
      let url = `https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${pageToFetch}`;
      if (postId) {
        url = `https://academics.newtonschool.co/api/v1/quora/post/${postId}`;
      }
      const response = await axios.get(url, {
        headers: {
          'projectID': 'tpibj7ie8i1w',
          'Authorization': `Bearer ${dataUser}`
        }
      });
      console.log(response.data.data);
      if (postId) {
        setPosts([response.data.data]);
        console.log(response.data.data);
      } else {
        if (Array.isArray(response.data.data)) {
          if (response.data.data.length === 0) {
            setHasMore(false);
          } else {
            setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
            setError(null);
          }
        } else {
          // console.error("Failed to fetch the posts", response.data.data);
          toast.error("Failed to fetch the posts", response.data.data)
        }
      }

      if (!initialApiCallMade) {
        setInitialApiCallMade(true);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200),
    [hasMore]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (hasMore) {
      fetchPosts(page);
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (postId) {
      setPosts([]);
      setPage(1);
      setInitialApiCallMade(false);
      fetchPosts(1);
    }
  }, [postId]);

  return (
    <div className="lg:ml-[27%] lg:w-[45%] md:w-full md:mx-[2%] lg:mt-[5%] mt-[8%] rounded-2xl">
      <div
        className="relative flex flex-col pt-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-2xl"
        style={colour}
      >
        <div
          className="relative flex text-gray-700 bg-clip-border rounded-sm"
          onClick={() => setShow(true)}
        >
          <Avatar round size="25" className="mt-0.5 ml-2" name="w" />
          <input
            placeholder="What do you want to ask or share?"
            className="p-1 ml-6 border border-spacing-1 rounded-lg w-full mr-4"
            style={inputStyle}
          />
        </div>
        <div className="flex justify-around p-2 gap-2 xs:gap-5">
          <div className="flex items-center ml-4">
            <Ask />
            <h1 className="flex items-center">
              <CreatePost text={"Ask"} />
            </h1>
          </div>

          <div className="flex items-center">
            <Answer />
            <h1 className="" onClick={() => navigate("/Answers")}>
              Answer
            </h1>
          </div>

          <div className="flex items-center mr-6">
            <Post />
            <div className="">
              <AddPost />
            </div>
          </div>
        </div>
      </div>
      <div>
        {posts.map((post, index) => {
          const authorInitial = post.author?.name
            ? post.author?.name.charAt(0).toUpperCase()
            : "?";
          return (
            <div
              className="relative flex flex-col mt-2 text-gray-700 bg-white shadow-md bg-clip-border rounded-2xl"
              key={index}
              style={postCardStyle}
            >
              <div className="flex items-center p-2">
                {post.channel?.image ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={post.channel?.image}
                  />
                ) : (
                  <Avatar
                    round
                    size="25"
                    className="mt-0.5 ml-2"
                    name={authorInitial}
                  />
                )}
                <h1 className="ml-5 mt-2 font-semibold">{post.author?.name}</h1>
              </div>
              <div className="p-6">
                <h5
                  className="block mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-black"
                  onClick={() => handlePostOpen(post._id)}
                >
                  {post?.title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {post?.content}
                </p>
              </div>
              {post.images.length > 0 && (
                <div className="relative h-80 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
                    src={post.images[0]}
                    alt="card-image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <GetComments
                postId={post?._id}
                likeCount={post?.likeCount}
                commentCount={post?.commentCount}
                postTitle={post?.title}
                postContent={post?.content}
                postImage={post.images[0]}
                fetchPosts={fetchPosts}
              />
            </div>
          );
        })}

        {isFetching && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Rightbar;
