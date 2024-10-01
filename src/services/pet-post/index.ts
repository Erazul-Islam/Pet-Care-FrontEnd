/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

"use server"

import { revalidateTag } from "next/cache"

import axiosInstance from "@/src/lib/axiosInstance"



export const createPetPost = async (formData:FormData) : Promise <any> => {
    try {
        const {data} = await axiosInstance.post("/pet/pet-post",formData, {
            headers : {
                "Content-type" : "multipart/form-data"
            }
        })

        revalidateTag("post")

        return data

    }catch (error) {
        console.log(error)
        throw new Error ("Failed to create post")
    }
}