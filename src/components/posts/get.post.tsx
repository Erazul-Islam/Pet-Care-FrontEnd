/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // /* eslint-disable prettier/prettier */
// // /* eslint-disable import/order */
// // /* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, Spinner } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

import Payment from "./payment";

import { useGetPost } from "@/src/hooks/get.post.hook";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
} from "@/src/hooks/comment.hook";
import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/follow.hook";
import { useDownVotePost, useUpvotePost } from "@/src/hooks/post.hook";
import { useGetUser } from "@/src/hooks/auth.hook";
import { TComment } from "@/src/types";
import PetPostSort from "./post.sort";
import EditCommentModal from "./edit-comment-modal";
import CommentSection from "./comment";

const GetPost = () => {
  const { data: posts, isSuccess, refetch, isFetching } = useGetPost();
  const { data: userData } = useGetUser();

  const { user } = useUser();
  const stripePromise = loadStripe(
    "pk_test_51OEWQiI8i8m69lNjPL8a3QNQtS31dfaIR6lr00gHoVxSTvtZpjdNVv186ZG7pYGfTwqchyWoClqvbBLGmdzA4Oxr00lZCJmnc7"
  );

  const addComment = useAddComment();
  const editComment = useEditComment();
  const deleteComment = useDeleteComment();
  const { mutate: follow } = useFollowUser();
  const { mutate: unfollow } = useUnfollowUser();
  const upvotePost = useUpvotePost();
  const downVotePost = useDownVotePost();

  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [updatedCommentText, setUpdatedCommentText] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "mostUpvoted">("newest");
  const [filterByCategory, setFilterByCategory] = useState<
    "All" | "Story" | "TIP"
  >("All");

  const sortedPosts = useMemo(() => {
    if (!isSuccess || !posts?.data) return [];

    let sorted = [...posts?.data];

    sorted = sorted.filter((post) => post.isPublished === true);

    if (filterByCategory !== "All") {
      sorted = sorted.filter((post) => post.category === filterByCategory);
    }

    if (sortBy === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "mostUpvoted") {
      sorted.sort((a, b) => b.totalUpvotes - a.totalUpvotes);
    }

    return sorted;
  }, [isSuccess, posts, sortBy, filterByCategory]);

  const handleAddComment = async (postId: string) => {
    const text = commentText[postId]?.trim();

    if (!user) {
      toast.error("Please log in First");

      return;
    }

    if (!text) {
      toast.error("Comment cannot be empty");
      refetch();

      return;
    }

    try {
      await addComment.mutateAsync({ postId, text });
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      refetch();
    } catch (err) {}
  };

  const handleUpvotePost = async (postId: string) => {
    if (!user) {
      toast.error("Please log in First");

      return;
    }
    await upvotePost.mutateAsync(postId);
  };

  const handleDownVotePost = async (postId: string) => {
    if (!user) {
      toast.error("Please log in First");

      return;
    }
    await downVotePost.mutateAsync(postId);
  };

  const openEditModal = (
    postId: string,
    commentId: string,
    currentText: string
  ) => {
    setCurrentPostId(postId);
    setCurrentCommentId(commentId);
    setUpdatedCommentText(currentText);
    setModalVisible(true);
  };

  const handleUpdateComment = async () => {
    if (currentPostId && currentCommentId) {
      await editComment.mutateAsync({
        postId: currentPostId,
        commentId: currentCommentId,
        updatedComment: updatedCommentText,
      });
      setModalVisible(false);
      refetch();
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      await deleteComment.mutateAsync({ postId, commentId });
      refetch();
    } catch (err) {}
  };

  const handleFollow = (postId: string) => {
    const targetPost = posts?.data.find(
      (post: { _id: string }) => post._id === postId
    );

    if (!user) {
      toast.error("Please log in First");

      return;
    }

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

    if (!user) {
      toast.error("Please log in First");

      return;
    }

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
    unfollow(targetUserId);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "newest" | "mostUpvoted");
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
        <PetPostSort
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          filterByCategory={filterByCategory}
          setFilterByCategory={setFilterByCategory}
        />
        <motion.div className="grid grid-cols-1 gap-4">
          {isSuccess &&
            sortedPosts?.map((post, index) => {
              const isFollowing = userData?.data?.following?.some(
                (followingUserId: { id: any }) =>
                  followingUserId.id === post.userId
              );
              const isUserPremium = userData?.data?.isPremium;
              const isPostPremium = post.isPremium === "YES";
              const shouldShowFullContent = isPostPremium
                ? isUserPremium
                : true;
              const displayContent = shouldShowFullContent
                ? post.description
                : post.description.length > 100
                  ? post.description.substring(0, 100) + "..."
                  : post.description;

              return (
                <div key={index}>
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
                          <p className="text-xs">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                          <p className="text-xs text-purple-600 font-bold">
                            total upvotes {post?.totalUpvotes}
                          </p>
                          <p className="text-xs text-pink-600 font-bold">
                            total downvote {post?.totalDownvotes}
                          </p>
                        </div>
                        <div>
                          {post?.isPremium === "YES" ? (
                            <img
                              alt="Premium"
                              className="w-12 h-12"
                              src="https://i.ibb.co/jM3xrDW/premium-quality.png"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="lg:flex flex">
                        {isFollowing ? (
                          <motion.button
                            className="bg-teal-700 ml-3 text-white px-4 py-1 rounded-sm text-sm"
                            whileHover={{
                              scale: 1.2,
                              transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUnfollow(post._id)}
                          >
                            UnFollow
                          </motion.button>
                        ) : (
                          <motion.button
                            className="bg-teal-700 text-white px-4 py-1 rounded-sm text-sm"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "blueviolet",
                              transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFollow(post._id)}
                          >
                            Follow
                          </motion.button>
                        )}
                        <motion.button
                          className="bg-purple-600 ml-3 text-white px-4 py-1 rounded-sm text-sm"
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpvotePost(post._id)}
                        >
                          Upvote
                        </motion.button>
                        <motion.button
                          className="bg-red-400 ml-3 text-white px-4 py-1 rounded-sm text-sm"
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownVotePost(post._id)}
                        >
                          DownVote
                        </motion.button>
                      </div>
                    </div>

                    {/* Post Content */}

                    <div className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-yellow-500 text-lg">
                          {post.caption}
                        </h3>
                        <button className="bg-pink-600 rounded-sm w-12 h-8">
                          {post.category}
                        </button>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(displayContent),
                        }}
                        className="text-sm mt-3"
                      />
                      {(isPostPremium &&
                        !isUserPremium &&
                        post.description.length > 100) ||
                      (!isPostPremium && post.description.length > 100) ? (
                        isPostPremium ? (
                          <button
                            className="text-pink-700 font-bold mt-2"
                            disabled={userData?.data?.isPremium === false}
                          >
                            Pay to see
                          </button>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    {/* Post Image */}
                    {post.photo && (
                      <motion.img
                        alt={post.caption}
                        className="w-full h-96 object-cover rounded-lg mb-4"
                        src={post.photo}
                        transition={{
                          ease: "easeIn",
                          duration: 1,
                          type: "spring",
                          stiffness: 100,
                        }}
                      />
                    )}

                    {post &&
                    post.isPremium === "YES" &&
                    userData?.data?.isPremium === false ? (
                      <Elements stripe={stripePromise}>
                        <Payment />
                      </Elements>
                    ) : null}

                    <CommentSection
                      commentText={commentText}
                      setCommentText={setCommentText}
                      handleAddComment={handleAddComment}
                      post={post}
                      openEditModal={openEditModal}
                      handleDeleteComment={handleDeleteComment}
                    />
                  </div>
                </div>
              );
            })}
        </motion.div>
        <EditCommentModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleUpdateComment={handleUpdateComment}
          updatedCommentText={updatedCommentText}
          setUpdatedCommentText={setUpdatedCommentText}
        />
      </section>
    </div>
  );
};

export default GetPost;
