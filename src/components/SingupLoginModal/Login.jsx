import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signUpBg from '../../assets/SignUpBg.jpg';
import googleLogo from '../../assets/google.jpeg';
import facebookLogo from '../../assets/facebook.jpeg';
import SignUp from "./SignUp";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        appType: 'quora'
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('Please fill in both email and password fields');
            return;
        }

        try {
            const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', loginData, {
                headers: {
                    projectID: 'tpibj7ie8i1w',
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200 && response.data.status === 'success') {
                localStorage.setItem("userInfo", JSON.stringify(response.data.data.user));
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('status', 'success');
                toast.success("Login Successful");
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                localStorage.setItem('status', 'failure');
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Login failed. It seems you haven't signed up yet.");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <div style={{ backgroundImage: `url(${signUpBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", minHeight: "100vh" }} className='flex items-center justify-center'>
                <div className='bg-white w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-sm p-4 md:p-8'>
                    <h1 className='text-red-700 text-4xl md:text-6xl font-bold font-serif text-center'>Quora</h1>
                    <h1 className='text-center font-bold text-gray-500 mt-3'>A place to share knowledge and better understand the world</h1>
                    <div className='flex flex-col lg:flex-row'>
                        <div className='flex flex-col items-center lg:items-start lg:w-1/2'>
                            <h1 className='text-zinc-400 text-xs md:text-sm lg:w-full text-center lg:text-left'>
                                By continuing you indicate that you agree to Quora’s
                                <span className='text-cyan-700'> Terms of Service</span> and <span className='text-cyan-700'> Privacy Policy.</span>
                            </h1>
                            <div className='flex p-4 border border-spacing-1 items-center w-full lg:w-80 rounded-sm mt-5'>
                                <img src={googleLogo} className='w-5 h-5 ml-2' alt='Google logo' />
                                <h1 className='ml-7 cursor-not-allowed'>Continue with Google</h1>
                            </div>
                            <div className='flex p-4 border border-spacing-1 items-center w-full lg:w-80 rounded-sm mt-5'>
                                <img src={facebookLogo} className='w-6 h-5 ml-2 rounded-full' alt='Facebook logo' />
                                <h1 className='ml-7 cursor-not-allowed'>Continue with Facebook</h1>
                            </div>
                            <div className='text-center text-sm font-semibold text-zinc-600 mt-3 hover:bg-gray-100 rounded-full cursor-pointer'>
                                <SignUp />
                            </div>
                        </div>
                        <div className='mt-8 lg:mt-0 lg:ml-16 lg:w-1/2'>
                            <h1 className='text-lg text-center font-bold'>Login</h1>
                            <hr className='w-full lg:w-72 mt-3 mx-auto lg:mx-0' />
                            <div className='mt-4'>
                                <h1 className='font-bold text-sm'>Email</h1>
                                <input
                                    name="email"
                                    value={loginData.email}
                                    onChange={onChangeHandler}
                                    placeholder='Your Email'
                                    className='border border-spacing-1 p-2 w-full lg:w-72 mt-2'
                                    type="email"
                                />
                            </div>
                            <div className='mt-4 relative'>
                                <h1 className='font-bold text-sm'>Password</h1>
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginData.password}
                                    onChange={onChangeHandler}
                                    placeholder='Your Password'
                                    className='border border-spacing-1 p-2 w-full lg:w-72 mt-2 pr-10'
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-[60%] left-[55%] text-gray-500"
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                            <div className='flex justify-center lg:justify-start mt-4'>
                                <button className='bg-blue-500 text-white py-2 px-3 rounded-full' onClick={onSubmitHandler}>Login</button>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3'/>
                    <h1 className='text-xs md:text-sm text-center mt-3 text-zinc-600'>
                        About . Careers . Privacy . Terms . Contact . Languages . Your Ad Choices . Press © Quora, Inc. 2024
                    </h1>
                </div>
            </div>
        </>
    );
}
