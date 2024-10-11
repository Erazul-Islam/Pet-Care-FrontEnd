/* eslint-disable prettier/prettier */

"use client"

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { useUser } from '@/src/context/user.provider';
import { useGetPost } from '@/src/hooks/get.post.hook';
import PdfGenerator from '@/src/components/pdf/pdf';
import { Avatar } from '@nextui-org/react';
import { TFollow } from '../../(user)/profile/_components/info';
import { useGetUser } from '@/src/hooks/auth.hook';

interface TUserPost {
    _id: string,
    userProfilePhoto: string,
    userName: string,
    caption: string,
    photo: string,
    description: string,
    createdAt: Date
}

const UserDashboard = () => {

    const { data, } = useGetPost()
    const { user, } = useUser()
    const { data: userData } = useGetUser()

    const filterData = data?.data?.filter((one: any) => one?.userEmail === user?.email)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data?.data) {
            const filteredPosts = data.data.filter((one: any) => one?.userEmail === user?.email);

            setPosts(filteredPosts);
        }
    }, [data, user?.email, posts]);

    return (
        <div>
            <h1 className='text-center mt-4 text-purple-500'>Welcome {userData.data.name}</h1>
            <div className='lg:flex lg:justify-evenly lg:ml-80 lg:mr-80'>
                <div className='mt-4'>
                    <PdfGenerator />
                </div>
                <div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Followers</h3>
                        <div className='mt-3'>
                            {
                                userData?.data?.followers.map((follower: TFollow) => (<div key={follower._id}>
                                    <div className='flex justify-between border h-16 border-white'>
                                        <Avatar className='mt-3 ml-8' src={follower.profilePhoto} alt="" />
                                        <h1 className='mt-4 text-pink-500 ml-8 mr-8 font-bold'>{follower.username}</h1>
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Following</h3>
                        <div className='mt-3'>
                            {
                                userData?.data?.following.map((follower: TFollow) => (<div key={follower._id}>
                                    <div className='flex gap-4 justify-between border h-16 border-white'>
                                        <Avatar className='mt-3 ml-8' src={follower.profilePhoto} alt="" />
                                        <h1 className='mt-4 mr-8 text-pink-500 ml-8 font-bold'>{follower.username}</h1>
                                        {/* <Button color='warning' className='rounded-sm text-white mt-2 mr-5'>Unfollow</Button> */}
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 lg:ml-80 ml-6 mb-6 md:ml-40 lg:mr-80'>
                {
                    filterData?.length === 0 ? <h1 className='text-center'>No post you have</h1> : <div className='lg:flex lg:justify-between'>
                        {
                            filterData?.map((one: TUserPost) => <div key={one._id}>
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
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(one.description) }} className="text-sm mt-3 text-gray-700" />
                                    </div>
                                    {one.photo && (
                                        <img
                                            alt={one.caption}
                                            className="w-full h-60 object-cover rounded-lg mb-4"
                                            src={one.photo}
                                        />
                                    )}
                                </div>

                            </div>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default UserDashboard;