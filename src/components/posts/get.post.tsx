/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, Spinner, } from '@nextui-org/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Payment from './payment';
import { motion } from 'framer-motion';
import { useGetPost } from '@/src/hooks/get.post.hook';
import { useAddComment, useDeleteComment, useEditComment } from '@/src/hooks/comment.hook';
import { useUser } from '@/src/context/user.provider';
import { useFollowUser, useUnfollowUser } from '@/src/hooks/follow.hook';
import { useDownVotePost, useUpvotePost } from '@/src/hooks/post.hook';
import DOMPurify from 'dompurify';
import PetMarkDownEditor from '@/src/app/(WithCommonLayout)/(user)/profile/_components/pet-post';
import { useGetUser } from '@/src/hooks/auth.hook';


const GetPost = () => {

    const { data: posts, isSuccess, refetch, isFetching } = useGetPost();
    const { data: userData } = useGetUser()

    const { user } = useUser()
    const stripePromise = loadStripe('pk_test_51OEWQiI8i8m69lNjPL8a3QNQtS31dfaIR6lr00gHoVxSTvtZpjdNVv186ZG7pYGfTwqchyWoClqvbBLGmdzA4Oxr00lZCJmnc7')

    const addComment = useAddComment();
    const editComment = useEditComment()
    const deleteComment = useDeleteComment()
    const { mutate: follow } = useFollowUser()
    const { mutate: unfollow } = useUnfollowUser()
    const upvotePost = useUpvotePost()
    const downVotePost = useDownVotePost()

    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);
    const [updatedCommentText, setUpdatedCommentText] = useState('');
    const [showOnlyUpvoted, setShowOnlyUpvoted] = useState(false);
    const [isToggling, setIsToggling] = useState(false)

    const handleAddComment = async (postId: string) => {
        const text = commentText[postId]?.trim();

        if (!text) {
            toast.error("Comment cannot be empty");
            refetch()

            return;
        }

        try {
            await addComment.mutateAsync({ postId, text });
            setCommentText(prev => ({ ...prev, [postId]: '' }));
            refetch()
        } catch (err) {
        }
    }

    const handleUpvotePost = async (postId: string) => {
        await upvotePost.mutateAsync(postId)
    }

    const handleDownVotePost = async (postId: string) => {
        await downVotePost.mutateAsync(postId)
    }

    const openEditModal = (postId: string, commentId: string, currentText: string) => {
        setCurrentPostId(postId);
        setCurrentCommentId(commentId);
        setUpdatedCommentText(currentText);
        setModalVisible(true);
    };

    const handleUpdateComment = async () => {
        if (currentPostId && currentCommentId) {
            await editComment.mutateAsync({ postId: currentPostId, commentId: currentCommentId, updatedComment: updatedCommentText });
            setModalVisible(false);
            refetch()
        }
    };

    const handleDeleteComment = async (postId: string, commentId: string) => {
        try {
            await deleteComment.mutateAsync({ postId, commentId });
            refetch()
        } catch (err) {

        }
    };



    const handleFollow = (postId: string) => {
        const targetPost = posts?.data.find(post => post._id === postId);
        if (!targetPost) {
            toast.error("Post not found.");
            return;
        }

        const targetUserId = targetPost.userId;
        if (!targetUserId) {
            toast.error("User ID not found for this post.");
            return;
        }

        if (user?._id === targetUserId) {
            toast.error("You cannot follow yourself.");
            return;
        }

        follow(targetUserId);
    };



    const handleUnfollow = async (postId: string) => {
        const targetPost = posts?.data.find(post => post._id === postId);
        if (!targetPost) {
            toast.error("Post not found.");
            return;
        }

        const targetUserId = targetPost.userId;
        if (!targetUserId) {
            toast.error("User ID not found for this post.");
            return;
        }

        if (user?._id === targetUserId) {
            toast.error("You cannot unfollow yourself.");
            return;
        }
        unfollow(targetUserId,{
            onSuccess : () => {
                window.location.reload()
            }
        })
    };

    const handleToggle = async () => {
        setIsToggling(true);
        setShowOnlyUpvoted(prev => !prev);
        try {
            await refetch(); // Refetch posts if necessary
        } catch (error) {
            toast.error("Failed to toggle posts");
        } finally {
            setIsToggling(false);
        }
    };

    const sortedPosts = posts?.data.filter(post => !showOnlyUpvoted || post.totalUpvotes > 0).sort((a, b) => b.totalUpvotes - a.totalUpvotes)





    return (
        <div>
            <section className="flex flex-col items-center ">
                <button
                    className={`bg-green-500 text-white mt-4 px-4 py-2 rounded-md mb-4 flex items-center justify-center ${isFetching ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    disabled={isFetching}
                    onClick={handleToggle}
                >
                    {isFetching ? <Spinner /> : showOnlyUpvoted ? "Show All Posts" : "Show Only Upvoted Posts"}
                </button>
                <PetMarkDownEditor />
                <motion.div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {
                        isSuccess &&
                        sortedPosts?.map((post) => {

                            const isFollowing = userData?.data?.following?.some(followingUserId => followingUserId.id === post.userId)

                            const isUpvoting = posts.data?.upvotes
                            console.log(isUpvoting)


                            return (

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
                                            <div className=''>

                                                {isFollowing ? (
                                                    <motion.button className="bg-teal-700 ml-3 text-white px-4 py-1 rounded-md text-sm" whileHover={{ scale: 1.2, transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }} onClick={() => handleUnfollow(post._id)}>UnFollow</motion.button>)
                                                    :
                                                    (<motion.button className="bg-teal-700  text-white px-4 py-1 rounded-md text-sm" whileHover={{ scale: 1.2, backgroundColor: "blueviolet", transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }} onClick={() => handleFollow(post._id)}>Follow</motion.button>)}
                                                <motion.button className="bg-purple-600 ml-3 text-white px-4 py-1 rounded-md text-sm" whileHover={{ scale: 1.2, transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }} onClick={() => handleUpvotePost(post._id)}>upvote</motion.button>
                                                <motion.button className="bg-red-400 ml-3 text-white px-4 py-1 rounded-md text-sm" whileHover={{ scale: 1.2, transition: { duration: 0.3 } }} whileTap={{ scale: 0.95 }} onClick={() => handleDownVotePost(post._id)}>downVote</motion.button>
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

                                        {/* Post Image */}
                                        {post.photo && (
                                            <motion.img alt={post.caption} className="w-full h-96 object-cover rounded-lg mb-4"
                                                src={post.photo}
                                                transition={{ ease: "easeIn", duration: 1, type: 'spring', stiffness: 100 }}
                                            // whileHover={{ scale: 1.1, }}
                                            />
                                        )}

                                        {post && post.isPremium === "YES" ? <Elements stripe={stripePromise}><Payment /></Elements> : null}

                                        {/* Comment Section */}
                                        <div className="mt-4">
                                            <input
                                                className="w-full border rounded-md px-3 py-2 focus:outline-none"
                                                placeholder="Write a comment..."
                                                value={commentText[post._id] || ''}
                                                onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                                            />
                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded-full mt-2"
                                                onClick={() => handleAddComment(post._id)}
                                            >
                                                Add Comment
                                            </button>
                                        </div>

                                        {/* Display Comments */}
                                        <div className="mt-4">
                                            {post.comments.map((comment) => (
                                                <div key={comment._id} className="flex justify-between items-center mt-2 border-t pt-2">
                                                    <div className='flex gap-4'>
                                                        <Avatar src={comment?.userProfilePhoto} />
                                                        <p className=' mt-2'>{comment.text}</p>
                                                    </div>
                                                    <div>
                                                        {user?._id != comment.userId ? '' : <button className="text-blue-500" onClick={() => openEditModal(post._id, comment._id, comment.text)}>
                                                            Edit
                                                        </button>}
                                                        {user?._id != comment.userId ? '' : <button
                                                            className="text-red-500 ml-2"
                                                            onClick={() => handleDeleteComment(post._id, comment._id)}
                                                        >
                                                            Delete
                                                        </button>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>)
                        })}
                </motion.div>
                {modalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-cente bg-opacity-50">
                        <div className=" rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                            <h4 className="text-lg font-semibold mb-4">Edit Comment</h4>
                            <input
                                className="border rounded-md p-2 w-full"
                                placeholder="Update your comment..."
                                value={updatedCommentText}
                                onChange={(e) => setUpdatedCommentText(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2" onClick={() => setModalVisible(false)}>
                                    Close
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdateComment}>
                                    Update Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default GetPost;

