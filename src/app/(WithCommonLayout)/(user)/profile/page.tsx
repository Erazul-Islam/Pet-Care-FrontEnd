/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import React, { useState } from 'react';

import { Button, Spinner } from '@nextui-org/react';
import PetMarkDownEditor from './components/pet-post';
import { useDeletePost, useGetMyPosts } from '@/src/hooks/get.post.hook';
import Info from './components/info';
import DOMPurify from 'dompurify';


interface TUserPost {
    _id: string,
    userProfilePhoto: string,
    userName: string,
    caption: string,
    photo: string,
    description: string,
    createdAt: Date
}


const UserProfile = () => {

    const {data:myPosts,refetch,isLoading} = useGetMyPosts()
    const { mutate: deletePost, } = useDeletePost()

    const handleDeletePost = (postId: string) => {
        deletePost(postId, {
            onSuccess: () => {
                refetch();
            },
        });
    };

    return (
        <div className="p-4 lg:ml-80 md:ml-40 lg:mr-80">
            <div className='lg:flex  mt-2 justify-between'>
                <Info />
                <PetMarkDownEditor />
            </div>
            <div className='mt-4 '>
                {
                    myPosts?.data?.length === 0 ? <h1 className='text-center font-bold'>No post you have</h1> : <div className='lg:flex lg:justify-between'>
                        {
                            myPosts?.data?.map((one: TUserPost) => <div key={one._id}>
                                <div
                                    className="bg-white mt-6 shadow-md rounded-lg p-4 max-w-md w-full"
                                >

                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                alt="User avatar"
                                                className="w-10 h-10 rounded-full"
                                                src={one.userProfilePhoto}
                                            />
                                            <div>
                                                <h4 className="text-black">{one.userName}</h4>
                                                <p className="text-xs text-gray-500">{new Date(one.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-emerald-800 text-lg">{one.caption}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(one.description) }} className="text-sm mt-3 text-gray-700"></p>
                                    </div>
                                    {one.photo && (
                                        <img
                                            alt={one.caption}
                                            className="w-full h-60 object-cover rounded-lg mb-4"
                                            src={one.photo}
                                        />
                                    )}
                                    <Button
                                        className='rounded-sm text-white'
                                        color='warning'
                                        onClick={() => handleDeletePost(one._id)}
                                    >
                                        {isLoading ? <Spinner size="sm" /> : 'Delete'}
                                    </Button>
                                </div>

                            </div>)
                        }
                    </div>
                }
            </div>
        </div>

    );
};

export default UserProfile;