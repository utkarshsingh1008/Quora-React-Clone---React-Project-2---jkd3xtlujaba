import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useUser } from './UserProvider';
import Avatar from 'react-avatar';
import { Dialog, DialogBody } from "@material-tailwind/react";

const GetComments = ({ postId, likeCount, commentCount, postContent, postTitle }) => {
  const { theme } = useUser();
  const [toggleComments, setToggleComments] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [count, setCount] = useState(likeCount);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(commentCount);
  const [colorBlue, setColorBlue] = useState('');
  const [colorRed, setColorRed] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(postTitle || "");
  const [content, setContent] = useState(postContent || "");
  const [posts, setPosts] = useState([]);
  const handleOpen = () => setOpen(!open);

  const notify=()=>{
    toast("Feature under development",{autoClose:1000})
  }

  const colour = {
    backgroundColor: theme === 'light' ? 'white' : 'black',
    colorBlue: theme === 'light' ? 'gray' : 'white'
  };

  // const userInfo = JSON.parse(localStorage.getItem("userInfo"))?._id;
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'projectID': 'tpibj7ie8i1w'
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post/${postId}/comments`, { headers });
      setData(response.data.data);
    } catch (error) {
      console.error( error.response.data.message);
    }
  };

  useEffect(() => {
    // Fetch initial upvote state from local storage if available
    // const upvoteState = localStorage.getItem(`upvote_${postId}`);
    // if (upvoteState) {
    //   const { color, count } = JSON.parse(upvoteState);
    //   setColorBlue(color === 'lightBlue' ? 'lightBlue' : '');
    //   setColorRed(color === '#ff6666' ? '#ff6666' : '');
    //   setCount(count);
    // }
  
    fetchComments();
  }, [postId]);


  const handleUpvote = async () => {
    try {
      await axios.post(`https://academics.newtonschool.co/api/v1/quora/like/${postId}`, {}, { headers });
      setCount(likeCount => likeCount + 1);
      setColorBlue('lightBlue');
      setColorRed('');
 
      toast('You liked the post');
    } catch (error) {
      console.error('Error upvoting the post:', error);
      toast.error(error.response.data.message);
      // setColorBlue('');
    }
  };
  
  const handleDownvote = async () => {
    try {
      await axios.delete(`https://academics.newtonschool.co/api/v1/quora/like/${postId}`, { headers });
      setCount(likeCount => likeCount - 1);
      setColorRed('#FF9999');
      setColorBlue('');
      toast('You disliked the post');
    } catch (error) {
      console.error('Error downvoting the post:', error);
      setColorRed('');
      toast.error(error.response.data.message);
    }
  };
  

  const handleAddComment = async () => {
    const body = {
      content: postComment
    };

    try {
      const response = await axios.post(`https://academics.newtonschool.co/api/v1/quora/comment/${postId}`, body, { headers });
      setData(prevData => [...prevData, response.data.data]);
      setPostComment(''); // Clear the input field
      setComment(comment => comment + 1); // Increment comment count
      toast.success('Comment added successfully');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment');
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`https://academics.newtonschool.co/api/v1/quora/comment/${id}`, { headers });
      setData(prevData => prevData.filter(comment => comment._id !== id));
      setComment(comment => comment - 1); // Decrement comment count
      toast.success('Comment deleted successfully');
      // fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Error deleting comment' + error.message);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))?._id;

  const handleEditPost = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"))?._id;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      // Fetch the post to check its author
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'tpibj7ie8i1w'
        }
      });
      const postAuthor = response.data?.data?.author?._id;
      
      // Check if the current user is the author of the post
      if (userInfo !== postAuthor) {
        setOpen(false)
        toast.error('You are not authorized to edit this post.');
        return;
      }

      // If the current user is the author, proceed with the edit
      await axios.patch(
        `https://academics.newtonschool.co/api/v1/quora/post/${postId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': 'tpibj7ie8i1w',
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setOpen(false);
      toast.success('Post updated successfully');
      window.location.reload();
      // fetchPosts()
    } catch (error) {
      console.error('There was an error updating the post!', error);
      setOpen(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const deletePost = async () => {
    // const token = localStorage.getItem("token");


    try {
      // Fetch the post to check its author
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': 'tpibj7ie8i1w'
        }
      });
      const postAuthor = response.data?.data?.author?._id;
      // console.log(response.data)
      // console.log(postAuthor)
      // Check if the current user is the author of the post
      if (userInfo !== postAuthor) {
        toast.error('You are not authorized to delete this post.');
        return;
      }

      // If the current user is the author, proceed with deletion
      await axios.delete(
        `https://academics.newtonschool.co/api/v1/quora/post/${postId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': 'tpibj7ie8i1w'
          }
        }
      );
      setOpen(false);
      toast.success('Post deleted successfully');
      window.location.reload();
      // fetchPosts();
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };



  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row justify-between items-center p-3 comments-container xs:flex-row rounded-2xl" style={colour}>
        <div className="flex flex-col items-center sm:flex-row gap-2 xs:flex-row ">
          <div className="flex" >
            <button  className=" align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 
              disabled:shadow-none disabled:pointer-events-none text-xs px-4 rounded-lg border hover:opacity-75 focus:ring
              focus:ring-white/50 active:opacity-[0.85] rounded-r-none border-r-0 flex items-center border-gray-300
              dark:border-gray-700 capitalize h-6 text-gray-700 dark:text-gray-300 rounded-s-full py-4 gap-1"
              type="button" onClick={handleUpvote} style={{ background: colorBlue}}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-blue-500" style={{ backgroundColor: colorBlue }}>
                <path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path>
              </svg>
              Upvote<span>&nbsp;•&nbsp;{count}</span>
            </button>
            <button
              className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 
                    disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] max-h-[40px] rounded-lg text-xs border hover:opacity-75 
                    focus:ring-gray-300 active:opacity-[0.85] border-gray-300 dark:border-gray-700 h-6 text-gray-700
                    dark:text-gray-300 rounded-e-full py-4"
              type="button"
              onClick={handleDownvote}
              style={{ backgroundColor: colorRed }}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-gray-700 dark:stroke-gray-300">
                  <path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path>
                </svg>
              </span>
            </button>
          </div>
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 
            disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg border hover:opacity-75 focus:ring 
            focus:ring-gray-300 active:opacity-[0.85] border-gray-300 dark:border-gray-700 flex items-center h-6 text-gray-700
            dark:text-gray-300 p-2 py-4" type="button" onClick={() => { setToggleComments(!toggleComments) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-gray-700 dark:stroke-gray-300">
              <path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" fill="none"></path>
            </svg>{comment}
          </button>
          <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all
            disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] max-h-[40px] rounded-lg 
            text-xs border hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] border-gray-300 
            dark:border-gray-700 h-6 text-gray-700 dark:text-gray-300 py-4" type="button" onClick={notify}>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-gray-700 dark:stroke-gray-300">
                <g className="icon_svg-stroke" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round">
                  <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                  <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div className="relative">
          <button
            aria-expanded={showDropdown}
            aria-haspopup="menu"
            className="relative align-middle select-none font-sans 
                      font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none
                      w-10 max-w-[40px] max-h-[40px] rounded-lg text-xs border hover:opacity-75 focus:ring focus:ring-gray-300 
                      active:opacity-[0.85] h-6 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-4"
            type="button"
            onClick={handleDropdownToggle}
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6">
                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd"></path>
              </svg>
            </span>
          </button>
          {showDropdown && (
            <div className="absolute top-full -left-20  shadow-md rounded-lg mt-2 z-10 p-2" style={colour}>
              {userInfo ? (
                <button
                  className="block px-4 py-2 text-sm text-gray-700 bg-gray-100 w-full text-center rounded-2xl hover:bg-light-blue-200"
                  role="menuitem"
                  onClick={handleOpen}
                >
                  Edit Post
                </button>
              ) : (
                <div className="block p-1 text-sm text-gray-700 bg-gray-100 w-full text-center rounded-2xl">
                  Not a user
                </div>
              )}
              {userInfo && (
                <button
                  className="block p-1 text-sm bg-gray-100 w-full text-center rounded-2xl hover:bg-red-400 text-gray-700 mt-1 "
                  role="menuitem"
                  onClick={deletePost}
                >
                  Delete Post
                </button>
              )}
            </div>
          )}
          {userInfo && (
            <Dialog open={open} handler={handleOpen} size="sm" >
              <DialogBody>
                <form onSubmit={handleEditPost}>
                  <div className="relative w-full min-w-[200px]">
                    <textarea
                      rows="2"
                      placeholder="Give a title..."
                      className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content-[' '] after:block after:w-full after:absolute after:-bottom-0 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:!border-gray-900">
                      {' '}
                    </label>
                  </div>
                  <div className="relative w-full min-w-[200px]">
                    <textarea
                      rows="8"
                      placeholder="Say something..."
                      className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content-[' '] after:block after:w-full after:absolute after:-bottom-0 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:!border-gray-900">
                      {' '}
                    </label>
                  </div>
                  <div className="flex gap-2 justify-between flex-col sm:flex-row">
                    <button
                      type="submit"
                      className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-blue-500 capitalize rounded-full"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </DialogBody>
            </Dialog>
          )}
        </div>

      </div >
      {toggleComments &&
        <div className='flex flex-col' style={colour}>
          <div className='flex justify-between p-3'>
            <input type="text" value={postComment} className='border border-gray-500 rounded-lg text-black pl-3' onChange={(e) => { setPostComment(e.target.value) }} />
            <button onClick={handleAddComment} className='bg-blue-300 rounded-full p-2 ml-5'>Add Comment</button>
          </div>
          <div>
            {data?.map((comment, idx) => (
              <div key={idx} className=' shadow-md p-2 border border-gray-200 rounded-lg' style={colour}>
                <div className='flex justify-between items-start'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2'>
                      <Avatar round size="25" className="text-white font-semibold" name={comment?.author_details?.name.charAt(0).toUpperCase()} textSizeRatio={3} />
                      <h1 className='text-lg font-semibold '>{comment?.author_details?.name}</h1>
                    </div>
                    <p className='bg-gray-100 p-1 rounded-lg text-gray-800'>{comment?.content}</p>
                  </div>
                  {userInfo === comment?.author_details?._id && (
                    <div
                      className='cursor-pointer p-1 bg-red-500 text-white rounded-lg text-center mt-7'
                      onClick={() => handleDeleteComment(comment?._id)}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      }
    </>
  );
};

export default  GetComments;
