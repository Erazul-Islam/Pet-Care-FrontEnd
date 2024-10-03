/* eslint-disable prettier/prettier */

"use client"

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { TPost } from '@/src/types';
import PhotoModal from './modal/modal';

const Feed = () => {
    const { userEmail, userName, userId, userProfilePhoto } = useUser();
    const { mutate: createPost } = useCreatePost();
    const queryClient = useQueryClient();
    
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('TIP');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

        createPost(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries();
                setCaption('');
                setDescription('');
                setPhoto('');
                setCategory('TIP');
            }
        });
    };

    return (
        <>
            <div className="max-w-2xl mx-auto p-4 shadow-md rounded-lg bg-white">
                <div className="flex items-start space-x-3">
                    <img 
                        src={userProfilePhoto} 
                        alt={userName} 
                        className="w-10 h-10 rounded-full" 
                    />
                    <div className="flex-1">
                        <textarea
                            className="w-full h-12 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            onFocus={() => setCaption('')} // Clear caption on focus
                        />
                        <textarea
                            className="w-full h-24 p-2 border border-gray-300 rounded-lg resize-none mt-2 focus:outline-none focus:border-blue-500"
                            placeholder="Add a description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2 cursor-pointer"
                            placeholder="Add a photo URL..."
                            type="text"
                            value={photo}
                            readOnly // Make it read-only to avoid typing
                            onClick={() => setIsModalOpen(true)} // Open modal on click
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
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600"
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <PhotoModal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={(url : any) => setPhoto(url)} 
            />
        </>
    );
};

export default Feed;
