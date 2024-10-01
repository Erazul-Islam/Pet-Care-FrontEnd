/* eslint-disable prettier/prettier */
import { useMutation, } from "@tanstack/react-query";
import { toast } from "sonner";

import { addCommentService, deleteComment, updateComment } from "../services/comment";

export const useAddComment = () => {
    return useMutation<any, Error, { postId: string, text: string }>({
        mutationKey: ["ADD_COMMENT"],
        mutationFn: async ({ postId, text }) => await addCommentService(postId, text),
        onSuccess: () => {
            toast.success("Comment added successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useEditComment = () => {
    return useMutation<any, Error, { postId: string, commentId: string, updatedComment: string }>({
        mutationKey: ["ADD_COMMENT"],
        mutationFn: async ({ postId, commentId, updatedComment }) => await updateComment(postId, commentId,updatedComment),
        onSuccess: () => {
            toast.success("Comment updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useDeleteComment = () => {
    return useMutation<string, Error, { postId: string, commentId: string }>({
        mutationKey: ["DELETE_COMMENT"],
        mutationFn: async ({ postId, commentId }) => await deleteComment(postId, commentId),
        onSuccess: () => {
            toast.success("Comment deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
