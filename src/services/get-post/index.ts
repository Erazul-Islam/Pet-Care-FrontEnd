/* eslint-disable prettier/prettier */
"use server"

import axiosInstance from "@/src/lib/axiosInstance"



export const getAllPost = async (page = 1, limit = 5) => {
    try {
        const { data } = await axiosInstance.get(`/pet/pet-post?page=${page}&limit=${limit}`)

        return data
    }
    catch (err) {
        throw new Error("Cannot get all the post")
    }
}
export const getScrollAllPost = async (page = 1, limit = 5) => {
    try {
        const  res  = await axiosInstance.get(`/pet/pet-post?page=${page}&limit=${limit}`)

        return res.data.data
    }
    catch (err) {
        throw new Error("Scrollbar")
    }
}


export const deletePost = async (postId: string) => {
    const response = await axiosInstance.delete(`/pet/pet-post/${postId}`)

    return response.data
}