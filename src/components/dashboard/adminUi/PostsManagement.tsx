/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import { useGetPaginatedPost } from "@/src/hooks/get.post.hook";
import { usePublish, useUnpublish } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { MdWorkspacePremium } from "react-icons/md";

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
  const itemsPerPage = 5;
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
      {/* <div className="flex justify-center items-center">
        {posts?.data?.map((post: TPost) => (
          <div className="" key={post._id}>
            <div className=" shadow-md cursor-pointer border border-purple-200 rounded-lg p-4 max-w-screen-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                    src={post.userProfilePhoto}
                  />
                  <div>
                    <h4>{post.userName}</h4>
                    <p className="text-xs">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs">
                      total upvotes {post?.totalUpvotes}
                    </p>
                    <p className="text-xs">
                      total downvote {post?.totalDownvotes}
                    </p>
                  </div>
                  <div>
                    {post?.isPremium === "YES" ? (
                      <MdWorkspacePremium color="purple" size={50} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-emerald-800 text-lg">
                  {post.caption}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.description),
                  }}
                  className="text-sm mt-3"
                />
              </div>
              {post.photo && (
                <motion.img
                  alt={post.caption}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                  src={post.photo}
                />
              )}
              {post.isPublished === true ? (
                <Button
                  className="rounded-sm text-white"
                  color="warning"
                  onClick={() => handleunPublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Unpublish"}
                </Button>
              ) : (
                <Button
                  className="rounded-sm text-white"
                  color="warning"
                  onClick={() => handlePublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Publish"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div> */}

      <Table
        aria-label="Posts Table"
        style={{ height: "auto", minWidth: "100%" }}
      >
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Posted By</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Post Title</TableColumn>
          <TableColumn>Total Upvotes</TableColumn>
          <TableColumn>Total Downvotes</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {posts?.data?.map((post : TPost, ) => (
            <TableRow key={post._id}>
              <TableCell>
                <img src={post.photo} alt={post.userName} className="w-12 h-12 rounded-full" />
              </TableCell>
              <TableCell>{post.userName}</TableCell>
              <TableCell> {new Date(post.createdAt).toLocaleString()}</TableCell>
              <TableCell>random</TableCell>
              <TableCell>{post.totalUpvotes}</TableCell>
              <TableCell>{post.totalDownvotes}</TableCell>
              <TableCell>{post.isPublished === true ? (
                <Button
                  className="rounded-sm text-white"
                  color="warning"
                  onClick={() => handleunPublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Unpublish"}
                </Button>
              ) : (
                <Button
                  className="rounded-sm text-white"
                  color="warning"
                  onClick={() => handlePublish(post._id)}
                >
                  {publishingPostId === post._id ? <Spinner /> : "Publish"}
                </Button>
              )}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm ">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 text-sm text-white bg-blue-500 rounded-sm"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsManagement;
