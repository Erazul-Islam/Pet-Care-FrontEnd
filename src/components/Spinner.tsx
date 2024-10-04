/* eslint-disable prettier/prettier */

"use client"

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { TPost } from '@/src/types';
import PhotoModal from './modal/modal';

const Feed = () => {
    const { userEmail, userName, userId, userProfilePhoto } = useUser()
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
            <div className="w-2/3 mx-auto p-4 shadow-md rounded-lg">
                <div className="flex items-start ">
                    <div className="flex-1">
                        <div className="  rounded-lg p-2 ">
                            <textarea
                                className="w-full h-12 p-2 border border-purple-50 rounded-lg resize-none focus:outline-none "
                                placeholder={`What's on your mind`}
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                onFocus={() => setCaption('')} // Clear caption on focus
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    className=" p-2 rounded-lg mt-2 cursor-pointer "
                                    placeholder="Add a photo URL..."
                                    type="text"
                                    value={photo}
                                    readOnly
                                    onClick={() => setIsModalOpen(true)}
                                />
                                <button
                                    className="ml rounded-full p-2"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Add Photo
                                </button>
                                <select
                                    className="w-full p-2  rounded-lg mt-4 "
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="TIP">TIP</option>
                                    <option value="Story">Story</option>
                                </select>
                            </div>
                        </div>
                        <textarea
                            className="w-full h-24 p-2  rounded-lg resize-none mt-4 focus:outline-none "
                            placeholder="Add a description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 w-full hover:bg-blue-600"
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
                onSubmit={(url: any) => setPhoto(url)}
            />
        </>
    );
};

export default Feed;
