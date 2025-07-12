"use client";

import React, { useState } from "react";

import { useCreatePost } from "@/src/hooks/post.hook";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useUser } from "@/src/context/user.provider";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PetMarkDownEditor = () => {
  const { user } = useUser();

  const { mutate: createPost, isPending } = useCreatePost();
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [category, setCategory] = useState("TIP");
  const [isPremium, setPremium] = useState("YES");

  const handlePost = () => {
    if (!user) {
      toast.error("Please log in firs");

      return;
    }

    if (!caption) {
      toast.error("Please put down a caption");
      return;
    }

    if (!description) {
      toast.error("Please put down a description");
      return;
    }

    if (!photoFile) {
      toast.error("Please provide photo url");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("isPremium", isPremium);
    formData.append("photo", photoFile);

    createPost(formData, {
      onSuccess: () => {
        setCaption("");
        setDescription("");
        setPhotoFile(null);
      },
    });
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
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPhotoFile(file || null);
              }}
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
              {isPending ? (
                <Loader2 className="animate-spin flex justify-center items-center" />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetMarkDownEditor;
