/* eslint-disable prettier/prettier */
"use server"

import axiosInstance from "@/src/lib/axiosInstance"


export const addCommentService = async (postId: string, text: string) => {
    try {
        const response = await axiosInstance.post(`/pet/pet-post/${postId}/comments`, {
            comments: [{ text }]
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const updateComment = async (postId: string, commentId: string, text: string) => {
    const response = await axiosInstance.put(`/pet/pet-post/${postId}/comments/${commentId}`,
        { comments: [{ text }] }
    )

    return response.data
}

export const deleteComment = async (postId: string, commentId: string) => {
    const response = await axiosInstance.delete(`/pet/pet-post/${postId}/comments/${commentId}`)

    return response.data
}