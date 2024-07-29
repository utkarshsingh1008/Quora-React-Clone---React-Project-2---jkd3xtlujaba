import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const CreateSpace = ({ onNewCommunity }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleOpen = () => setOpen(!open);
    const createSpace = async () => {
        const token = localStorage.getItem("token");
        const data = {
            name: name,
            description: description,
            images: image,
        };

        try {
            const response = await axios.post('https://academics.newtonschool.co/api/v1/quora/channel/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'tpibj7ie8i1w',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Space created successfully:', response.data.data);
            setOpen(false);
            toast.success('Space created successfully');           
            onNewCommunity(); // Call the callback to refresh the community list
        } catch (error) {
            console.error('There was an error creating the space!', error);
            setOpen(false);
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <div className='p-2 flex items-center hover:bg-gray-400 bg-gray-300 rounded-lg text-sm w-[90%]' onClick={handleOpen}>+ Create Space</div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Create a Space
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Share your interests, curate content, host discussions, and more.
                        </Typography>
                        <div className="-mb-2" variant="div">
                            Name*
                            <div className="text-5">This can be changed in Space settings.</div>
                        </div>
                        <Input
                            label="name"
                            placeholder="Space Name"
                            size="lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="-mb-2" variant="div">
                            Brief description
                            <div className="text-10">Include a few keywords to show people what to expect if they join.</div>
                        </div>
                        <Input
                            label="Description"
                            size="xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="bg-blue-500 p-2 rounded-2xl ml-[37%] text-white w-20 text-center" onClick={createSpace}>
                            Create
                        </div>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default CreateSpace;
