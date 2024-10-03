/* eslint-disable prettier/prettier */

import axiosInstance from "@/src/lib/axiosInstance"
import clientAxiosInstance from "@/src/lib/clientAxiosInstance"

export const followUser = async (targetUserId : string)  => {
    const response = await clientAxiosInstance.post(`/auth/follow/${targetUserId}`)

    console.log(response.data)

    return response.data
}

export const unfollowUser = async (targetUserId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/users/unfollow/${targetUserId}`);
    
    return response.data;
};