/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

"use server"

import axiosInstance from "@/src/lib/axiosInstance"
import { TPost } from "@/src/types"



export const createPetPost = async (data : TPost) => {
    const response = await axiosInstance.post('/pet/pet-post',data)

    console.log(response)
    console.log(response.data)

    return response.data
}


export const unpublishPost = async (postId : string) => {
    const res = await axiosInstance.patch(`/pet/pet-post/${postId}/unpublish`)

    return res.data
}
export const publishPost = async (postId : string) => {
    const res = await axiosInstance.patch(`/pet/pet-post/${postId}/publish`)

    return res.data
}