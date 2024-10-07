/* eslint-disable prettier/prettier */

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { deletePost, getAllPost } from "../services/get-post";


export const useGetPost = () => {
    return useQuery({
      queryKey: ["GET_POST"],
      queryFn: async () => await getAllPost(),
    });
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