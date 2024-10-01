/* eslint-disable prettier/prettier */

import axiosInstance from "@/src/lib/axiosInstance"

export const followUser = async (targetUserId : string)  => {
    const response = await axiosInstance.post(`/auth/follow/${targetUserId}`)

    return response.data
}

export const unfollowUser = async (targetUserId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/users/unfollow/${targetUserId}`);
    
    return response.data;
};