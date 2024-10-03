/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

"use server"

import axiosInstance from "@/src/lib/axiosInstance"
import { TPost } from "@/src/types"



export const createPetPost = async (data : TPost) => {
    const response = await axiosInstance.post('/pet/pet-post',data)

    return response.data
}
