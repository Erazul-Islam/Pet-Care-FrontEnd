/* eslint-disable prettier/prettier */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { acceptFriendRequest, requestFriend, viewAllFriendRequest } from "../services/friend-request";



export const useFriendRequest = () => {

    const queryClient = useQueryClient();

    return useMutation <any, Error, { senderId: string, receiverId: string }> ({
        mutationKey: ["FOLLOW_USER"],
        mutationFn: async ({ senderId, receiverId }) => await requestFriend(senderId, receiverId),
        onSuccess: () => {
            toast.success("Request Accepted");
            queryClient.invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
}
export const useAcceptFriendRequest = () => {

    const queryClient = useQueryClient();

    return useMutation <any, Error, { userId: string, senderId: string }> ({
        mutationKey: ["FOLLOW_USER"],
        mutationFn: async ({ userId, senderId }) => await acceptFriendRequest(userId,senderId),
        onSuccess: () => {
            toast.success("Request sent");
            queryClient.invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
}

export const useViewFriendRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["VIEW_FRIEND_REQUEST"],
        mutationFn: async (postId: string) => await viewAllFriendRequest(postId),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success("DELETED");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};