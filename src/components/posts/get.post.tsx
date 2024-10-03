/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, } from '@nextui-org/react';

import { useGetPost } from '@/src/hooks/get.post.hook';
import { useAddComment, useDeleteComment, useEditComment } from '@/src/hooks/comment.hook';
import { useUser } from '@/src/context/user.provider';
import { useFollowUser, useUnfollowUser } from '@/src/hooks/follow.hook';



const GetPost = () => {

    const { data: posts, isSuccess, refetch } = useGetPost();

    const { user } = useUser()


    const addComment = useAddComment();
    const editComment = useEditComment()
    const deleteComment = useDeleteComment()
    const { mutate: follow } = useFollowUser()
    const { mutate: unfollow } = useUnfollowUser()

    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);
    const [updatedCommentText, setUpdatedCommentText] = useState('');

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
            // console.error("Error adding comment:", err);
            // Error toast is already handled in the hook
        }
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
        const targetPostId = posts?.data.find(post => post._id === postId)
        console.log(targetPostId)
        const targetUserId = targetPostId?.userId;
        console.log(targetUserId)
        follow(targetUserId);
    };



    const handleUnfollow = async (postId: string) => {
        const targetUserId = posts?.data.find(post => post._id === postId)?.userId;
        if (targetUserId) {
            try {
                await unfollow(targetUserId);
                refetch()
            } catch (err) {
                toast.error("Error unfollowing user");
            }
        }
    };

    return (
        <div>
            <section className="flex flex-col items-center space-y-4">
                {isSuccess &&
                    posts?.data.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white shadow-md rounded-lg p-4 max-w-md w-full"
                        >
                            {/* User Info and Follow Button */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        alt="User avatar"
                                        className="w-10 h-10 rounded-full"
                                        src={post.userProfilePhoto}
                                    />
                                    <div>
                                        <h4 className="text-black">{post.userName}</h4>
                                        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm" onClick={() => handleFollow(post._id)}>Follow</button>
                            </div>

                            {/* Post Content */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-emerald-800 text-lg">{post.caption}</h3>
                                <p className="text-sm mt-3 text-gray-700">{post.description}</p>
                            </div>

                            {/* Post Image */}
                            {post.photo && (
                                <img
                                    alt={post.caption}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                    src={post.photo}
                                />
                            )}

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
                                            <p className='text-black mt-2'>{comment.text}</p>
                                        </div>
                                        <div>
                                            {user?.name != comment.userName ? '' : <button className="text-blue-500" onClick={() => openEditModal(post._id, comment._id, comment.text)}>
                                                Edit
                                            </button>}

                                            {user?.name != comment.userName ? '' : <button
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
                    ))}
                {modalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
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

