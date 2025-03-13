/* eslint-disable prettier/prettier */

import clientAxiosInstance from "@/src/lib/clientAxiosInstance"

export const followUser = async (targetUserId : string)  => {
    try {
        const response = await clientAxiosInstance.post(`/auth/follow/${targetUserId}`);

        return response.data;
    } catch (error: any) {

        throw error.response?.data || new Error('An error occurred while following the user.');
    }
}

export const unfollowUser = async (targetUserId: string): Promise<{ message: string }> => {
    const response = await clientAxiosInstance.post(`/auth/unfollow/${targetUserId}`);
    
    return response.data;
};