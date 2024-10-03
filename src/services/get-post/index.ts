/* eslint-disable prettier/prettier */
"use server"

import axiosInstance from "@/src/lib/axiosInstance"



export const getAllPost = async () => {
    try {
        const {data} = await axiosInstance.get("/pet/pet-post")
        
        return data
    }
    catch (err) {
        throw new Error("yaap")
    }
}

export const deletePost = async (postId : string) => {
    const response = await axiosInstance.delete(`/pet/pet-post/${postId}`)

    return response.data
}