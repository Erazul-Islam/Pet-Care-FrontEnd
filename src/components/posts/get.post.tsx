/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // /* eslint-disable prettier/prettier */
// // /* eslint-disable import/order */
// // /* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"

import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, Spinner, } from '@nextui-org/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

import Payment from './payment';

import { useGetPost } from '@/src/hooks/get.post.hook';
import { useAddComment, useDeleteComment, useEditComment } from '@/src/hooks/comment.hook';
import { useUser } from '@/src/context/user.provider';
import { useFollowUser, useUnfollowUser } from '@/src/hooks/follow.hook';
import { useDownVotePost, useUpvotePost } from '@/src/hooks/post.hook';
import PetMarkDownEditor from '@/src/app/(WithCommonLayout)/(user)/profile/_components/pet-post';
import { useGetUser } from '@/src/hooks/auth.hook';
import { TComment } from '@/src/types';


const GetPost = () => {

    // const { data: posts, isSuccess, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPost();
    const { data: posts, isSuccess, refetch, isFetching, } = useGetPost();
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
    const [sortBy, setSortBy] = useState<'newest' | 'mostUpvoted'>('newest')
    const [filterByCategory, setFilterByCategory] = useState<'All' | 'Story' | 'TIP'>('All');


    const sortedPosts = useMemo(() => {
        if (!isSuccess || !posts?.data) return [];

        let sorted = [...posts?.data];

        sorted = sorted.filter(post => post.isPublished === true)

        if (filterByCategory !== 'All') {
            sorted = sorted.filter(post => post.category === filterByCategory);
        }

        if (sortBy === 'newest') {
            sorted.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        } else if (sortBy === 'mostUpvoted') {
            sorted.sort((a, b) => b.totalUpvotes - a.totalUpvotes);
        }

        return sorted;
    }, [isSuccess, posts, sortBy, filterByCategory]);

    console.log("sorted", sortedPosts)

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
        const targetPost = posts?.data.find((post: { _id: string; }) => post._id === postId);

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
        const targetPost = posts?.data.find((post: any) => post._id === postId);

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
        unfollow(targetUserId)
    };
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'newest' | 'mostUpvoted');
    };

    if (isFetching && !isSuccess) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <section className="flex flex-col items-center ">
                <PetMarkDownEditor />
                <div className='flex mt-14 mb-2 gap-20'>
                    <div className="flex  w-full max-w-screen-md mb-1">
                        <select
                            className="border bg-purple-600 rounded-md px-3 py-2"
                            id="sort"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="newest">Newest</option>
                            <option value="mostUpvoted">Most Upvoted</option>
                        </select>
                    </div>
                    <div className="flex  w-full max-w-screen-md mb-1">
                        <select
                            className="border bg-purple-600 rounded-md px-3 py-2"
                            id="filter"
                            value={filterByCategory}
                            onChange={(e) => setFilterByCategory(e.target.value as 'All' | 'Story' | 'TIP')}
                        >
                            <option value="All">All</option>
                            <option value="Story">Story</option>
                            <option value="TIP">TIP</option>
                        </select>
                    </div>
                </div>
                <motion.div className='grid grid-cols-1 gap-4'>
                    {
                        isSuccess && sortedPosts?.map((post, index) => {
                            const isFollowing = userData?.data?.following?.some((followingUserId: { id: any; }) => followingUserId.id === post.userId);
                            const isUserPremium = userData?.data?.isPremium
                            const isPostPremium = post.isPremium === "YES";
                            const shouldShowFullContent = isPostPremium ? isUserPremium : true;
                            const displayContent = shouldShowFullContent
                                ? post.description
                                : post.description.length > 100
                                    ? post.description.substring(0, 100) + '...'
                                    : post.description;

                            return (
                                <div key={index} >
                                    <div className="shadow-md  border border-purple-200 rounded-lg p-4 max-w-screen-md">
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
                                                    {post?.isPremium === "YES" ? (
                                                        <img alt="Premium" className='w-12 h-12' src="https://i.ibb.co/jM3xrDW/premium-quality.png" />
                                                    ) : ""}
                                                </div>
                                            </div>
                                            <div className=''>
                                                {isFollowing ? (
                                                    <motion.button
                                                        className="bg-teal-700 ml-3 text-white px-4 py-1 rounded-md text-sm"
                                                        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleUnfollow(post._id)}
                                                    >
                                                        UnFollow
                                                    </motion.button>
                                                ) : (
                                                    <motion.button
                                                        className="bg-teal-700 text-white px-4 py-1 rounded-md text-sm"
                                                        whileHover={{ scale: 1.2, backgroundColor: "blueviolet", transition: { duration: 0.3 } }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleFollow(post._id)}
                                                    >
                                                        Follow
                                                    </motion.button>
                                                )}
                                                <motion.button
                                                    className="bg-purple-600 ml-3 text-white px-4 py-1 rounded-md text-sm"
                                                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleUpvotePost(post._id)}
                                                >
                                                    Upvote
                                                </motion.button>
                                                <motion.button
                                                    className="bg-red-400 ml-3 text-white px-4 py-1 rounded-md text-sm"
                                                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleDownVotePost(post._id)}
                                                >
                                                    DownVote
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Post Content */}

                                        <div className="mb-4">
                                            <h3 className="font-semibold text-emerald-800 text-lg">{post.caption}</h3>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayContent) }}
                                                className="text-sm mt-3"
                                            />
                                            {
                                                // Show Read More / Read Less only if content is truncated or if it's premium and user is premium
                                                (isPostPremium && !isUserPremium && post.description.length > 100) ||
                                                    (!isPostPremium && post.description.length > 100) ? (
                                                    isPostPremium ? <button
                                                        className="text-pink-700 font-bold mt-2"
                                                        disabled={userData?.data?.isPremium === false}
                                                    >
                                                        Pay to see
                                                    </button> : ''
                                                ) : ""
                                            }
                                        </div>

                                        {/* Post Image */}
                                        {post.photo && (
                                            <motion.img
                                                alt={post.caption}
                                                className="w-full h-96 object-cover rounded-lg mb-4"
                                                src={post.photo}
                                                transition={{ ease: "easeIn", duration: 1, type: 'spring', stiffness: 100 }}
                                            />
                                        )}

                                        {post && post.isPremium === "YES" && userData?.data?.isPremium === false ? (
                                            <Elements stripe={stripePromise}>
                                                <Payment />
                                            </Elements>
                                        ) : null}

                                        {/* Comment Section */}
                                        <div className="mt-4">
                                            <input
                                                className="w-full border rounded-md px-3 py-2 focus:outline-none"
                                                placeholder="Write a comment..."
                                                value={commentText[post._id] || ''}
                                                onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                                            />
                                            <button
                                                className="bg-pink-700  text-white px-4 py-1 rounded-sm mt-4"
                                                onClick={() => handleAddComment(post._id)}
                                            >
                                                Add Comment
                                            </button>
                                        </div>

                                        {/* Display Comments */}
                                        <div className="mt-4">
                                            {post.comments.map((comment: TComment) => (
                                                <div key={comment._id} className="flex justify-between items-center mt-2 border-t pt-2">
                                                    <div className='flex gap-4'>
                                                        <Avatar src={comment?.userProfilePhoto} />
                                                        <p className='mt-2'>{comment.text}</p>
                                                    </div>
                                                    <div>
                                                        {user?._id !== comment.userId ? null : (
                                                            <>
                                                                <button
                                                                    className="text-blue-500"
                                                                    onClick={() => openEditModal(post._id, comment._id, comment.text)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="text-red-500 ml-2"
                                                                    onClick={() => handleDeleteComment(post._id, comment._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </motion.div>
                {modalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                        <div className="bg-pink-600 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                            <h4 className="text-lg font-semibold mb-4">Edit Comment</h4>
                            <input
                                className="border rounded-md p-2 w-full"
                                placeholder="Update your comment..."
                                value={updatedCommentText}
                                onChange={(e) => setUpdatedCommentText(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => setModalVisible(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-purple-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleUpdateComment}
                                >
                                    Update Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div >
    );
};

export default GetPost;