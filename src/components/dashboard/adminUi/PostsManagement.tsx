/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import { useGetPaginatedPost } from "@/src/hooks/get.post.hook";
import { usePublish, useUnpublish } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import {
  Spinner,
} from "@nextui-org/react";
import {ChevronRight , ChevronLeft} from 'lucide-react'

interface TPost {
  _id: string;
  userProfilePhoto: string;
  userName: string;
  createdAt: Date;
  totalUpvotes: number;
  totalDownvotes: number;
  isPremium: string;
  isPublished: boolean;
  photo: string;
  caption: string;
  description: string;
}

const PostsManagement = () => {
  const [publishingPostId, setPublishingPostId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { mutateAsync: unpublish } = useUnpublish();
  const { mutateAsync: publish } = usePublish();

  const {
    data: posts,
    refetch,
    isLoading,
    isFetching,
  } = useGetPaginatedPost(currentPage, itemsPerPage);

  const totalPosts = posts?.pagination?.totalPosts || 1;

  const pageSize = posts?.pagination?.pageSize || 1;

  const handleunPublish = (postId: string) => {
    setPublishingPostId(postId);
    unpublish(postId);
    refetch();
    setPublishingPostId(null);
  };

  const handlePublish = (postId: string) => {
    setPublishingPostId(postId);
    publish(postId);
    refetch();
    setPublishingPostId(null);
  };

  const totalPages = Math.ceil(totalPosts / pageSize);

  if (isLoading && isFetching) {
    return (
      <Spinner className="items-center flex justify-center min-h-screen" />
    );
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  return (
    <div className="">

      <table className="min-w-full">
      <thead>
            <tr className="text-left text-sm font-bold text-[#ffff]">
              <th className="py-6 px-6">User Photo</th>
              <th className="py-6 px-6">Posted By</th>
              <th className="py-6 px-16">Date</th>
              <th className="py-6 px-8">Post Title</th>
              <th className="py-6 px-6">Total Upvotes</th>
              <th className="py-6 px-6">Total Downvotes</th>
              <th className="py-6 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
          {posts?.data?.map((post : TPost, ) => (
            <tr className="hover:bg-[#0A1330]" key={post._id}>
              <td className="py-3 px-8">
                <img src={post.photo} alt={post.userName} className="w-12 h-12 rounded-full" />
              </td>
              <td className="py-3 px-1">{post.userName}</td>
              <td> {new Date(post.createdAt).toLocaleString()}</td>
              <td>{post.caption.split(" ").slice(0, 5).join(" ")}{post.caption.split(" ").length > 5 ? "..." : ""}</td>
              <td className="px-16">{post.totalUpvotes}</td>
              <td className="px-[70px]">{post.totalDownvotes}</td>
              <td>{post.isPublished === true ? (
                <Button
                  className="rounded-sm text-white"
                  style={{backgroundColor:'#CB3CFF'}}
                  onClick={() => handleunPublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Unpublish"}
                </Button>
              ) : (
                <Button
                  className="rounded-sm text-white"
                  style={{backgroundColor:'#CB3CFF'}}
                  onClick={() => handlePublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Publish"}
                </Button>
              )}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between md:ml-8 md:mr-12 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 text-sm rounded-sm"
          disabled={currentPage === 1}
        >
          <ChevronLeft/>
        </button>
        <span className="px-4 py-2 text-sm ">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 text-sm rounded-sm"
          disabled={currentPage === totalPages}
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default PostsManagement;
