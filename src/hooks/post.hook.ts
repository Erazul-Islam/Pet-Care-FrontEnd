/* eslint-disable prettier/prettier */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { createPetPost, publishPost, unpublishPost } from "../services/pet-post"
import { TPost,  } from "../types"
import { downVotePost, upvotePost } from "../services/upvote"


// const QUERY_KEYS = {
//     GET_POST: "GET_POST",
//     PUBLISH_POST: "PUBLISH_POST",
//     UNPUBLISH_POST: "UNPUBLISH_POST",
// } as const;

// export type QueryKeys = typeof QUERY_KEYS[keyof typeof QUERY_KEYS];



export const useCreatePost = () => {

    const queryClient = useQueryClient()

    return useMutation ({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData : TPost) => await createPetPost(postData),
        onSuccess : () => {
            toast.success("post created successfully")
            queryClient.invalidateQueries()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useUnpublish = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["UNPUBLISH_POST"],
        mutationFn: async (postId: string) => await unpublishPost(postId),
        onSuccess: () => {
            toast.success("UnPublished the post");
            queryClient.invalidateQueries()
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

export const usePublish = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["PUBLISH_POST"],
        mutationFn: async (postId: string) => await publishPost(postId),
        onSuccess: () => {
            toast.success("Published the post");
            queryClient.invalidateQueries()
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

export const useUpvotePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["UPVOTE_POST"],
        mutationFn: async (postId: string) => await upvotePost(postId),
        onSuccess: () => {
            toast.success("post upvoted successfully")
            queryClient.invalidateQueries()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useDownVotePost = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["DOWNVOTE_POST"],
        mutationFn: async (postId: string) => await downVotePost(postId),
        onSuccess: () => {
            toast.success("post downVoted successfully")
            queryClient.invalidateQueries()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}