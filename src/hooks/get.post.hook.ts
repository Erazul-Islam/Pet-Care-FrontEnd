/* eslint-disable prettier/prettier */

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { deletePost, getAllPost, getMyPosts, getPaginatedPost } from "../services/get-post";

export const useGetPost = () => {
    return useQuery({
        queryKey : ['GET_POSTS'],
        queryFn : async () => await getAllPost()
    })
};

export const useGetPaginatedPost = (page=1,pageSize=1) => {
    return useQuery({
        queryKey : ['GET_PAGINATED_POST',page,pageSize],
        queryFn : async () => getPaginatedPost(page,pageSize),
    })
}

export const useGetMyPosts = () => {
    return useQuery({
        queryKey : ['GET_MY_POSTS'],
        queryFn : async () => await getMyPosts()
    })
};


export const useDeletePost = () => {
    return useMutation({
        mutationKey: ["DELETE_POST"],
        mutationFn: async (postId: string) => await deletePost(postId),
        onSuccess: () => {
            toast.success("DELETED");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};