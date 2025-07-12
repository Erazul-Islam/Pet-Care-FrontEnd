"use server";

import axiosInstance from "@/src/lib/axiosInstance";

export const createPetPost = async (data: FormData) => {
  const response = await axiosInstance.post("/pet/pet-post", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const unpublishPost = async (postId: string) => {
  const res = await axiosInstance.patch(`/pet/pet-post/${postId}/unpublish`);

  return res.data;
};
export const publishPost = async (postId: string) => {
  const res = await axiosInstance.patch(`/pet/pet-post/${postId}/publish`);

  return res.data;
};
