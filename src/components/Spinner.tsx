"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import PhotoModal from "./modal/modal";

import { useCreatePost } from "@/src/hooks/post.hook";

const Feed = () => {
  const { mutate: createPost } = useCreatePost();

  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [category, setCategory] = useState("TIP");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePost = () => {
    if (!photoFile) {
      toast.error("Please provide photo url");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("description", description);
    formData.append("category", category);
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
      <div className="w-2/3 mx-auto p-4 shadow-md rounded-lg">
        <div className="flex items-start ">
          <div className="flex-1">
            <div className="  rounded-lg p-2 ">
              <textarea
                className="w-full h-12 p-2 border border-purple-50 rounded-lg resize-none focus:outline-none "
                placeholder={`What's on your mind`}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                onFocus={() => setCaption("")} // Clear caption on focus
              />
              <div className="flex items-center mt-2">
                <input
                  className=" p-2 rounded-lg mt-2 cursor-pointer "
                  placeholder="Add a photo URL..."
                  type="text"
                  readOnly
                  onClick={() => setIsModalOpen(true)}
                />
                <button
                  className="ml rounded-full p-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Photo
                </button>
                <select
                  className="w-full p-2  rounded-lg mt-4 "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="TIP">TIP</option>
                  <option value="Story">Story</option>
                </select>
              </div>
            </div>
            <ReactQuill
              className="mt-6 mb-6"
              placeholder="Description"
              theme="snow"
              value={description}
              onChange={setDescription}
            />

            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 w-full hover:bg-blue-600"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <PhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(url: any) => setPhotoFile(url)}
      />
    </>
  );
};

export default Feed;
