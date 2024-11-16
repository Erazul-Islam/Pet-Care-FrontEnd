/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { motion } from "framer-motion"
import DOMPurify from 'dompurify';

import { useDeleteUser, useUpdateUserRole } from '@/src/hooks/auth.hook';
import { useGetPost } from '@/src/hooks/get.post.hook';
import { usePublish, useUnpublish } from '@/src/hooks/post.hook';
import { useGetHistory } from '@/src/hooks/payment.hook';
import axios from 'axios';
import { Spinner } from '@nextui-org/react';
import { toast } from 'sonner';


interface TUserInfo {
    _id: string,
    name: string,
    profilePhoto: string,
    role: string
}

interface ApiResponse<T> {
    statusCode: number;
    status: number;
    success: boolean;
    message: string;
    data: T;
}


interface TMetaData {
    _id: string,
    amount: number,
    created: number,
    metadata: {
        userName: string,
        userEmail: string,
        userProfilePhoto: string
    }
}

interface TPost {
    _id: string,
    userProfilePhoto: string,
    userName: string,
    createdAt: Date,
    totalUpvotes: number,
    totalDownvotes: number,
    isPremium: string,
    isPublished: boolean,
    photo: string,
    caption: string,
    description: string
}



const Adminpage = () => {

    

    const { data: history } = useGetHistory()
    const [users, setUsers] = useState<TUserInfo[]>([])
    const [publishingPostId, setPublishingPostId] = useState<string | null>(null);


    const { mutateAsync: unpublish } = useUnpublish()
    const { mutateAsync: publish } = usePublish()

    const { data: posts, refetch } = useGetPost()

    const { mutateAsync } = useUpdateUserRole()

    const { mutate } = useDeleteUser()


    useEffect(() => {
        axios.get<ApiResponse<TUserInfo[]>>('https://petcare-lake.vercel.app/api/auth/all-profile')
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const handleUpdate = (userId: string) => {
        mutateAsync({ userId })
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === userId ? { ...user, role: 'ADMIN' } : user
            )
        )
        toast.success('You made admin')
        refetch()
    }

    const handleunPublish =  (postId: string) => {
        setPublishingPostId(postId)
        unpublish(postId)
        refetch()
        setPublishingPostId(null);
    }

    const handlePublish = (postId: string) => {
        setPublishingPostId(postId)
        publish(postId)
        refetch()
        setPublishingPostId(null);
    }

    const handleDelete = (userId: string) => {

        mutate(userId)
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        toast.success("User deleted")
        refetch()
    }





    return (
        <div className='lg:ml-80 lg:mr-80'>
            <h1 className='text-center mt-5 text-2xl text-pink-500 font-bold'>Payment history</h1>
            <h2 className='text-xl text-center font-bold text-purple-500 mt-4'>This history came from stripe.So I show limited</h2>
            <div className='grid items-center justify-center cursor-pointer lg:grid-cols-3 gap-6 p-6'>
                {history?.data?.length > 0 ? (
                    history?.data?.map((one: TMetaData) => (
                        <div key={one._id} className=' shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105'>
                            <img className='w-24 h-24 rounded-md mb-4 object-cover mx-auto' src={one.metadata.userProfilePhoto} alt={`${one.metadata.userName}'s profile`} />
                            <h3 className='text-xl text-purple-500 font-semibold text-center mb-2'>{one.metadata.userName}</h3>
                            <p className=' text-cyan-600 text-center'>Email: {one.metadata.userEmail}</p>
                            <p className='text-green-500 text-center font-bold mt-2'>Amount: ${one.amount / 100}</p>
                            <p className='text-pink-600 text-center'>Payment Created: {new Date(one.created * 1000).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-center col-span-full'>No payment history available.</p>
                )}
            </div>
            <h1 className='text-2xl mt-4 mb-4 text-pink-600 font-bold text-center'>User Management</h1>
            <div className="grid lg:grid-cols-4 gap-8  p-6">
                {users?.map((one: TUserInfo) => (
                    <div
                        key={one?._id}
                        className=" shadow-lg cursor-pointer border border-white rounded-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center">
                            <img
                                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-indigo-500"
                                src={one.profilePhoto}
                                alt={`${one.name}'s profile`}
                            />
                            <h1 className="text-xl font-semibold mb-2">{one?.name}</h1>
                            <p className="text-sm mb-4">Role: {one?.role}</p>
                            {one?.role === "USER" ? (
                                <Button
                                    color="secondary"
                                    className="mt-3 rounded-lg transition duration-300 transform hover:scale-105"
                                    onClick={() => handleUpdate(one._id)}
                                >
                                    Make Admin
                                </Button>
                            ) : (
                                <Button
                                    color="secondary"
                                    className="mt-3 rounded-lg cursor-default"
                                >
                                    {one.role}
                                </Button>
                            )}
                            <Button
                                className="mt-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300 transform hover:scale-105"
                                color="warning"
                                onClick={() => handleDelete(one?._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className=''>
                <h1 className='text-3xl mt-6 mb-6 font-bold text-pink-600 text-center'>All posts</h1>
                {
                    posts?.data?.map((post: TPost) => (

                        <div className='lg:ml-64' key={post._id}>
                            <div
                                className=" shadow-md mt-20 cursor-pointer border border-purple-200 rounded-lg p-4 max-w-screen-md"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            alt="User avatar"
                                            className="w-10 h-10 rounded-full"
                                            src={post.userProfilePhoto}
                                        />
                                        <div>
                                            <h4 className="">{post.userName}</h4>
                                            <p className="text-xs">{new Date(post.createdAt).toLocaleString()}</p>
                                            <p className="text-xs">total upvotes {post?.totalUpvotes}</p>
                                            <p className="text-xs">total downvote {post?.totalDownvotes}</p>
                                        </div>
                                        <div>
                                            {post?.isPremium === "YES" ? <img alt="" className='w-12 h-12 ' src="https://i.ibb.co.com/jM3xrDW/premium-quality.png" /> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="font-semibold text-emerald-800 text-lg">{post.caption}</h3>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                                        className="text-sm mt-3"
                                    />
                                </div>
                                {post.photo && (
                                    <motion.img alt={post.caption} className="w-full h-96 object-cover rounded-lg mb-4"
                                        src={post.photo}
                                        transition={{ ease: "easeIn", duration: 1, type: 'spring', stiffness: 100 }}
                                    // whileHover={{ scale: 1.1, }}
                                    />
                                )}
                                {
                                    post.isPublished === true ? <Button className='rounded-sm text-white' color='warning' onClick={() => handleunPublish(post._id)}>{publishingPostId === post._id ? <Spinner /> : 'Unpublish'}</Button> : <Button className='rounded-sm text-white' color='warning' onClick={() => handlePublish(post._id)}>{publishingPostId === post._id ? <Spinner /> : 'Publish'}</Button>
                                }
                            </div>
                        </div>))
                }
            </div>
        </div>
    );
};

export default Adminpage;