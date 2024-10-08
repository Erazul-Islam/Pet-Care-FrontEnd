/* eslint-disable prettier/prettier */
"use client"

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCreatePost } from '@/src/hooks/post.hook';
import { TPost } from '@/src/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useGetUser } from '@/src/hooks/auth.hook';



const PetMarkDownEditor = () => {
    // const { userEmail, userName, userId, userProfilePhoto, } = useUser()
    const {data} = useGetUser()

    const { mutate: createPost, } = useCreatePost();
    const queryClient = useQueryClient();
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('TIP');
    const [isPremium,setPremium] = useState("YES")
    const [isPublished,setIsPublished] = useState(true)

    const handlePost = () => {
        const payload: TPost = {
            userEmail: data?.data?.email,
            userName : data?.data?.name,
            userId : data?.data?._id,
            userProfilePhoto : data?.data?.profilePhoto,
            caption,
            description,
            photo,
            category,
            isPremium,
            isPublished,
            comments: [],
        };

        createPost(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries();
                setCaption('');
                setDescription('');
                setPhoto('');
                setCategory('TIP');
                setPremium("YES"),
                setIsPublished(true)
            }
        })
        console.log(payload)
    };


    return (
        <>
            <div className="max-w-2xl mx-auto h-[500px] p-4 shadow-md rounded-lg">
                <div className="flex items-start space-x-3">
                    <div className="flex-1">
                        <textarea
                            className="w-full h-12 p-2 border border-gray-300 rounded-lg resize-none"
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <ReactQuill className='mt-6 mb-6' placeholder='Description' theme="snow"  value={description} onChange={setDescription} />
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            placeholder="Add a photo URL..."
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                        <select
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="TIP">TIP</option>
                            <option value="Story">Story</option>
                        </select>
                        <p className='text-xl mt-2 mb-2'>Do you want to make this post premium?</p>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            value={isPremium}
                            onChange={(e) => setPremium(e.target.value)}
                        >
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                        <button
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600"
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PetMarkDownEditor;
