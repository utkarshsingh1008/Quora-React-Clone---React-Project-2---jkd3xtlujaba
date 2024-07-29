import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    IconButton,
} from "@material-tailwind/react";

const SignUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const handleOpen = () => setOpen((cur) => !cur);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(),
        }));

        if (name === "password") {
            if (value.length < 6) {
                setPasswordStrength("Weak");
            } else if (value.length < 10) {
                setPasswordStrength("Medium");
            } else {
                setPasswordStrength("Strong");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            setErrorMessage("Please fill in all the required fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const body = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                appType: "quora",
            };

            const response = await axios.post(
                'https://academics.newtonschool.co/api/v1/user/signup',
                JSON.stringify(body),
                {
                    headers: {
                        projectID: "tpibj7ie8i1w",
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 201) {
                const data = response.data;

                if (data.status === "success") {
                    localStorage.setItem("userInfo", JSON.stringify(data.data.user));
                    localStorage.setItem("token", data.token);
                    setOpen(false);
                    toast('Your account created successfully');
                    setFormData({ name: "", email: "", password: "" });
                }
            }
        } catch (err) {
            setErrorMessage(err.response.data.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <p onClick={handleOpen} className="p-3 bg-gray-200 text-center rounded-xl">Sign Up with email</p>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                dismiss={{ enabled: false }}
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <IconButton variant="text" onClick={handleOpen}>
                                <AiOutlineClose className="h-5 w-5 " />
                            </IconButton>
                        </div>
                        <Typography variant="h5" color="black">
                            Sign Up
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Name
                        </Typography>
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Email
                        </Typography>
                        <Input label="Email" name="email" value={formData.email} onChange={handleChange} size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Password
                        </Typography>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                size="lg"
                            />
                            <div onClick={togglePasswordVisibility} className="absolute right-3 top-3">
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                        </div>
                        {passwordStrength && (
                            <Typography variant="caption">{`Password Strength: ${passwordStrength}`}</Typography>
                        )}
                        {errorMessage && (
                            <Typography variant="caption" color="red">{errorMessage}</Typography>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        <p className={`bg-[#2e69ff] p-2 rounded-3xl text-white cursor-pointer ${loading ? 'opacity-50' : ''}`} onClick={handleSubmit}>
                            Sign Up
                        </p>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default SignUp;
