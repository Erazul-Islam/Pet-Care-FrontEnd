/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useUser } from '@/src/context/user.provider';
import { useGetPost } from '@/src/hooks/get.post.hook';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';

interface TUserPost {
    _id: string,
    userProfilePhoto: string,
    userName: string,
    caption: string,
    photo: string,
    description: string,
    createdAt: Date
}

const UserPostManagement = () => {

    const { user } = useUser()
    const { data, } = useGetPost()
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data?.data) {
            const filteredPosts = data?.data?.filter((one: any) => one?.userEmail === user?.email);

            setPosts(filteredPosts);
        }
    }, [data, user?.email, posts]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentPosts = posts?.slice(indexOfFirstUser, indexOfLastUser)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(posts?.length / itemsPerPage);

    return (
        <div>
            <div className=''>
                {
                    currentPosts?.length === 0 ? <h1 className='text-center'>No post you have</h1> : <div className=''>
                        {
                            currentPosts?.map((one: TUserPost) => <div key={one._id}>
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
            <div className="flex  justify-center mb-2">
                <button
                    onClick={() => handlePageChange(1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-pink-600 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-pink-600 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-sm ">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-pink-600 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-pink-600 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default UserPostManagement;