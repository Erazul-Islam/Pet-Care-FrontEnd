/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

"use client"

import React from 'react';
import { Button } from '@nextui-org/button';
import { motion } from "framer-motion"
import DOMPurify from 'dompurify';

import { useDeleteUser, useGetProfile, useUpdateUserRole } from '@/src/hooks/auth.hook';
import { useGetPost } from '@/src/hooks/get.post.hook';
import { usePublish, useUnpublish } from '@/src/hooks/post.hook';



const Adminpage = () => {

    const { data, refetch } = useGetProfile()

    const {mutateAsync : unpublish} = useUnpublish()
    const {mutateAsync : publish} = usePublish()

    const { data: posts } = useGetPost()

    const { mutateAsync } = useUpdateUserRole()

    const { mutate } = useDeleteUser()

    const handleUpdate = (userId: string) => {
        mutateAsync({ userId })
        refetch()
    }

    const handleunPublish = (postId:string) => {
        unpublish(postId)
        refetch()
    }

    const handlePublish = (postId:string) => {
        publish(postId)
        refetch()
    }

    const handleDelete = (userId: string) => {
        mutate(userId)
        refetch()
    }





    return (
        <div>
            <div className='grid lg:grid-cols-3 lg:ml-80 lg:mr-60'>
                {
                    data?.data?.map((one) => (<div key={one._id}>
                        <div>
                            <h1>{one.name}</h1>
                            <img className='w-40 rounded-sm h-40' src={one.profilePhoto} alt="" />
                            {
                                one.role === "USER" ? <Button color='secondary' className='mt-3 ml-7' onClick={() => handleUpdate(one._id)} >Make Admin</Button> : <Button color='secondary' className='mt-3 ml-7'>{one.role}</Button>
                            } <br />
                            <Button className='mt-3 ml-7' color='warning' onClick={() => handleDelete(one._id)}>Delete</Button>
                        </div>
                    </div>))
                }
            </div>
            <div>
                {
                    posts?.data?.map((post) => (

                        <div key={post._id}>
                            <div
                                className=" shadow-md mt-20 border border-purple-200 rounded-lg p-4 max-w-screen-md"
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

                                {/* Post Content */}
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
                                    post.isPublished === true ? <Button color='secondary' onClick={() => handleunPublish(post._id)}>unpublish</Button> : <Button color='secondary' onClick={() => handlePublish(post._id)}>publish</Button>
                                }
                            </div>
                        </div>))
                }
            </div>
        </div>
    );
};

export default Adminpage;