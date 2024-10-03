/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useUser } from '@/src/context/user.provider'
import React, { useEffect, useState } from 'react';

import { Button, Image, Spinner, } from '@nextui-org/react';
import PetMarkDownEditor from './_components/pet-post';
import { useDeletePost, useGetPost } from '@/src/hooks/get.post.hook';


const UserProfile = () => {


    const { user, } = useUser()

    const { data, refetch } = useGetPost()

    const filterData = data?.data?.filter((one) => one?.userEmail === user?.email)

    const { mutate: deletePost, } = useDeletePost()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (data?.data) {
            const filteredPosts = data.data.filter((one) => one?.userEmail === user?.email);
            setPosts(filteredPosts);
        }
    }, [data, user?.email]);

    const handleDeletePost = (postId: string) => {
        setLoading(true); // Set loading to true when starting delete
        deletePost(postId, {
            onSuccess: () => {
                // Remove the post locally and refetch data
                setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
                refetch(); // Optionally refetch to ensure you have the latest data
            },
            onError: (error) => {
                console.error('Error deleting post:', error); // Handle error as needed
            },
            onSettled: () => {
                setLoading(false); // Set loading to false after the request is settled
            }
        });
    };

    return (
        <div className="p-4">
            <div className='lg:flex justify-between'>
                <div className='flex gap-6'>
                    <Image alt='name' className='rounded-full' height={200} src={user?.profilePhoto} width={200} />
                    <div className=''>
                        <h2 className="text-2xl mt-16 font-bold">{user?.name}</h2>
                        <p>Email: {user?.email}</p>
                        <div>
                            <h1>21K followers</h1>
                            <h2>36 following</h2>
                        </div>
                    </div>
                </div>
                <PetMarkDownEditor />
            </div>
            <div className='mt-4 lg:ml-[600px]'>
                {
                    filterData?.length === 0 ? <h1>No post you have</h1> : filterData?.map((one) => <div key={one._id}>
                        <div
                            key={one._id}
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
                                <p className="text-sm mt-3 text-gray-700">{one.description}</p>
                            </div>
                            {one.photo && (
                                <img
                                    alt={one.caption}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                    src={one.photo}
                                />
                            )}
                            <Button
                                    color='warning'
                                    disabled={loading}
                                    onClick={() => handleDeletePost(one._id)}
                                >
                                    {loading ? <Spinner size="sm" /> : 'Delete'}
                                </Button>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default UserProfile;