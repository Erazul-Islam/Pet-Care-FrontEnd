/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useGetPost } from '@/src/hooks/get.post.hook';
import { usePublish, useUnpublish } from '@/src/hooks/post.hook';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import DOMPurify from 'dompurify';
import { Spinner } from '@nextui-org/react';

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


const PostsManagement = () => {

    const [publishingPostId, setPublishingPostId] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1




    const { mutateAsync: unpublish } = useUnpublish()
    const { mutateAsync: publish } = usePublish()

    const { data: posts, refetch } = useGetPost()

    const handleunPublish = (postId: string) => {
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

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentPosts = posts?.data?.slice(indexOfFirstUser, indexOfLastUser)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(posts?.data?.length / itemsPerPage);

    return (
        <div>
            <div className=''>
           
                {
                    currentPosts?.map((post: TPost) => (

                        <div className='lg:ml-72' key={post._id}>
                            <div
                                className=" shadow-md cursor-pointer border border-purple-200 rounded-lg p-4 max-w-screen-md"
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
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-sm ">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default PostsManagement;