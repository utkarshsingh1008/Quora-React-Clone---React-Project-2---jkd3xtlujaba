import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Dialog, DialogHeader, Input, Textarea } from "@material-tailwind/react";
import { useUser } from "./UserProvider";

export default function CreatePost({text}) {
  // const { show, setShow } = useUser();
  const [show,setShow]= useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("add-question");

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createPost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("images", image);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await axios.post(
        'https://academics.newtonschool.co/api/v1/quora/post/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': 'tpibj7ie8i1w',
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Post created successfully');
      setShow(false);
      window.location.reload();
    } catch (error) {
      setShow(false);
      console.error('There was an error creating the post!', error);
      const errorMessage = error.response?.data?.message || error.message || 'There was an error creating the post!';
      toast.error(errorMessage);
    }
  };

  const tabsData = [
    {
      label: "Add Question",
      value: "add-question",
      desc: (
        <form onSubmit={createPost} className="w-full max-w-[600px] bg-white dark:bg-gray-900 rounded-lg py-6 px-3 sm:px-6 flex flex-col items-start gap-2">
          <div className="w-full h-1 bg-blue-600 rounded-t"></div>
          <div className="p-3 w-full bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-md text-sm sm:text-base">
            <div className="font-bold">Tips on getting good answers quickly</div>
            <ul className="list-disc list-inside">
              <li>Make sure your question has not been asked already</li>
              <li>Keep your question short and to the point</li>
              <li>Double-check grammar and spelling</li>
            </ul>
          </div>
          <label htmlFor="post-title" className="font-semibold">Post Title <span className="font-normal">(required)</span>:</label>
          <Input
            id="post-title"
            placeholder="Enter The Question or Title"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="post-content" className="font-semibold">Post Description :</label>
          <Textarea
            id="post-content"
            placeholder="Enter Description or Answer"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full flex justify-between items-center px-6 py-4">
            <div className="flex gap-4 items-center">
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
              <button
                type="submit"
                className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-full transition duration-300"
              >
                Add Post
              </button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Create Post",
      value: "create-post",
      desc: (
        <form onSubmit={createPost} className="w-full h-max text-gray-700 p-4 antialiased font-sans text-base font-light leading-relaxed">
          <div className="text-lg font-semibold mx-auto text-center">Create Post</div>
          <div className="relative w-full min-w-[200px]">
            <Textarea
              rows="2"
              placeholder="Give a title..."
              className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="relative w-full min-w-[200px]">
            <Textarea
              rows="8"
              placeholder="Say something..."
              className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex gap-2 justify-between flex-col sm:flex-row">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="file"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-blue-500 capitalize rounded-full"
            >
              Post
            </button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <div>
      <h1 onClick={openModal} className="cursor-pointer" >{text}</h1>
      <Dialog open={show} handler={closeModal} size="sm">
        <DialogHeader>
          <Tabs className="w-[100%]" value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader className="bg-blue-500">
              {tabsData.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabsData.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </DialogHeader>
      </Dialog>
    </div>
  );
}
