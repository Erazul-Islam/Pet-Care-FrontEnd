/* eslint-disable prettier/prettier */

import axiosInstance from "@/src/lib/axiosInstance";
import clientAxiosInstance from "@/src/lib/clientAxiosInstance";


export const requestFriend = async (senderId : string,receiverId : string)  => {
    try {
        const response = await clientAxiosInstance.post(`/auth/send`,{senderId,receiverId});
        return response.data;
    } catch (error: any) {

        throw error.response?.data || new Error('An error occurred while following the user.');
    }
}

export const acceptFriendRequest = async (userId:string,senderId:string)  => {
    try {
        const response = await clientAxiosInstance.post(`/auth/accept`, {userId,senderId});
        console.log(response.data)
        return response.data;
    } catch (error: any) {

        throw error.response?.data || new Error('An error occurred while following the user.');
    }
}

export const viewAllFriendRequest = async (userId:string) => {
    try {
        const  res  = await axiosInstance.get(`/auth/${userId}/pending`)

        return res.data.data
    }
    catch (err) {
        throw new Error("yaap")
    }
}