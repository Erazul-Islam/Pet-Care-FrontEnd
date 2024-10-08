/* eslint-disable prettier/prettier */

"use client"

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { useUser } from '@/src/context/user.provider';
import { useGetPost } from '@/src/hooks/get.post.hook';
import PdfGenerator from '@/src/components/pdf/pdf';

const UserDashboard = () => {

    const { data, } = useGetPost()
    const { user, } = useUser()

    const filterData = data?.data?.filter((one : any) => one?.userEmail === user?.email)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data?.data) {
            const filteredPosts = data.data.filter((one : any) => one?.userEmail === user?.email);

            setPosts(filteredPosts);
        }
    }, [data, user?.email]);

    return (
        <div>
            <div className='mt-4 '>
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
            <div className='mt-4'>
                <PdfGenerator />
            </div>
        </div>
    );
};

export default UserDashboard;