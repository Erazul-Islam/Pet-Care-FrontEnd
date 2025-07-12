"use client";

import React from "react";
import { Button, Spinner } from "@nextui-org/react";
import DOMPurify from "dompurify";

import PetMarkDownEditor from "./components/pet-post";
import Info from "./components/info";

import { useDeletePost, useGetMyPosts } from "@/src/hooks/get.post.hook";

interface TUserPost {
  _id: string;
  userProfilePhoto: string;
  userName: string;
  caption: string;
  photo: string;
  description: string;
  createdAt: Date;
}

const UserProfile = () => {
  const { data: myPosts, refetch, isLoading } = useGetMyPosts();
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row">
        <Info />
        <PetMarkDownEditor />
      </div>
      <div className="p-4">
        {myPosts?.data?.length === 0 ? (
          <h1 className="text-center font-bold">No post you have</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {myPosts?.data?.map((one: TUserPost) => (
              <div key={one._id}>
                <div className=" mt-6 shadow-md rounded-lg p-4 max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                        src={one.userProfilePhoto}
                      />
                      <div>
                        <h4 className="text-white">{one.userName}</h4>
                        <p className="text-xs text-white">
                          {new Date(one.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-emerald-800 text-lg">
                      {one.caption}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(one.description),
                      }}
                      className="text-sm mt-3 text-white"
                    />
                  </div>
                  {one.photo && (
                    <img
                      alt={one.caption}
                      className="w-full h-60 object-cover rounded-lg mb-4"
                      src={one.photo}
                    />
                  )}
                  <Button
                    className="rounded-sm text-white"
                    color="warning"
                    onClick={() => handleDeletePost(one._id)}
                  >
                    {isLoading ? <Spinner size="sm" /> : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
