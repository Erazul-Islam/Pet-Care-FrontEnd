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