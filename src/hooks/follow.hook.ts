/* eslint-disable prettier/prettier */
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { followUser, unfollowUser } from "../services/follow";
/* eslint-disable prettier/prettier */
export const useFollowUser = () => {
    return useMutation({
        mutationKey: ["FOLLOW_USER"],
        mutationFn: async (targetUserId: string) => await followUser(targetUserId),
        onSuccess: () => {
            toast.success("Following");
        },
        onError: (error: any) => {
            toast.error(error.message);
            console.log(error)
            console.log(error.message)
        },
    });
};

export const useUnfollowUser = () => {
    return useMutation({
        mutationKey: ["UNFOLLOW_USER"],
        mutationFn: async (targetUserId: string) => await unfollowUser(targetUserId),
        onSuccess: () => {
            toast.success("Unfollowed");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};