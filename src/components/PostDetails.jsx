import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import GetComments from './GetComments';

const PostDetails = () => {
  const params=useParams();
  console.log(params)
  const [data,setData]=useState({});
  // Fetch data from the API
  const fetchData = async () => {
    // Define the headers
    const token=localStorage.getItem('token');
    const headers = {
        'projectID': 'tpibj7ie8i1w',
        'Authorization': `Bearer ${token}`
    };

    try {
        // Make the API call using Axios
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post/${params.id}`, { headers });
        
        // Set the data from the response
        setData(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Use the useEffect hook to fetch data when the component mounts
useEffect(() => {
    fetchData();
}, []);
  
  return (
    <div className='p-52'>
      Post Details
      <GetComments />
    </div>
    
  )
}

export default PostDetails