/* eslint-disable prettier/prettier */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { followUser, unfollowUser } from "../services/follow";
/* eslint-disable prettier/prettier */
export const useFollowUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["FOLLOW_USER"],
        mutationFn: async (targetUserId: string) => await followUser(targetUserId),
        onSuccess: () => {
            toast.success("Following");
            queryClient.invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

export const useUnfollowUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["UNFOLLOW_USER"],
        mutationFn: async (targetUserId: string) => await unfollowUser(targetUserId),
        onSuccess: () => {
            toast.success("Unfollowed");
            queryClient.invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};