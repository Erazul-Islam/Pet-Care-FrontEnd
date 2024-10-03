/* eslint-disable prettier/prettier */
"use server"

import axiosInstance from "@/src/lib/axiosInstance"



export const upvotePost = async (postId:string) => {
    const response = await axiosInstance.post(`/pet/pet-post/${postId}/upvote`)

    return response.data
}

export const downVotePost = async (postId:string) => {
    const response = await axiosInstance.post(`/pet/pet-post/${postId}/downvote`)

    return response.data
}
