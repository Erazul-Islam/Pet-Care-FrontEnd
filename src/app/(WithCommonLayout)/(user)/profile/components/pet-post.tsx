"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useCreatePost } from "@/src/hooks/post.hook";
import { TPost } from "@/src/types";
import "react-quill/dist/quill.snow.css";
import { useGetUser } from "@/src/hooks/auth.hook";

import dynamic from "next/dynamic";

import { useUser } from "@/src/context/user.provider";

import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PetMarkDownEditor = () => {
  const { data } = useGetUser();
  const { user } = useUser();

  const { mutate: createPost } = useCreatePost();
  const queryClient = useQueryClient();
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("TIP");
  const [isPremium, setPremium] = useState("YES");
  const [isPublished, setIsPublished] = useState(true);

  const handlePost = () => {
    const payload: TPost = {
      userEmail: data?.data?.email,
      userName: data?.data?.name,
      userId: data?.data?._id,
      userProfilePhoto: data?.data?.profilePhoto,
      caption,
      description,
      photo,
      category,
      isPremium,
      isPublished,
      comments: [],
    };

    if (!user) {
      toast.error("Please log in firs");

      return;
    }

    if (!caption) {
      toast.error("Please put down a caption");
    }

    if (!description) {
      toast.error("Please put down a description");
    }

    if (!photo) {
      toast.error("Please provide photo url");
    }

    createPost(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        setCaption("");
        setDescription("");
        setPhoto("");
        setCategory("TIP");
        setPremium("YES"), setIsPublished(true);
      },
    });
    console.log(payload);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto h-[525px] p-4 shadow-md ">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <textarea
              className="w-full h-12 bg-transparent text-white p-2 border border-gray-300  resize-none"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <ReactQuill
              className="mt-6 text-white mb-6"
              placeholder="Description"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
            <input
              className="w-full bg-transparent text-white p-2 border border-gray-300"
              placeholder="Add a photo URL..."
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
            <select
              className="w-full bg-transparent text-white p-2 border border-gray-300  mt-6"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="TIP">TIP</option>
              <option value="Story">Story</option>
            </select>
            <p className="text-xl border p-2 border-gray-300 mt-6 mb-2">
              Do you want to make this post premium?
            </p>
            <select
              className="w-full bg-transparent text-white p-2 border border-gray-300  mt-6"
              value={isPremium}
              onChange={(e) => setPremium(e.target.value)}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            <button
              className="bg-purple-700 text-white rounded-sm py-2 px-4 mt-4 hover:bg-blue-600"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetMarkDownEditor;
