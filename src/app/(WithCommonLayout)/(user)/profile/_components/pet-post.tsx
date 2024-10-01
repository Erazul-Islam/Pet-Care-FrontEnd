/* eslint-disable prettier/prettier */
"use client"

import React, { useState } from 'react';

import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { TPost } from '@/src/types';

const PetMarkDownEditor = () => {
    const { userEmail, userName, userId, userProfilePhoto } = useUser(); // Get user data from your context or hook
    const { mutate: createPost } = useCreatePost();

    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('TIP');

    const handlePost = () => {
        const payload: TPost = {
            userEmail,
            userName,
            userId,
            userProfilePhoto,
            caption,
            description,
            photo,
            category,
            comments: [],
        };

        createPost(payload);
        // Reset fields after submission
        setCaption('');
        setDescription('');
        setPhoto('');
        setCategory('TIP');
    };


    return (
        <>
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-start space-x-3">
                    <div className="flex-1">
                        <textarea
                            placeholder="What's on your mind?"
                            className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <textarea
                            placeholder="Add a description..."
                            className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none mt-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Add a photo URL..."
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
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
                        <button
                            onClick={handlePost}
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600"
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