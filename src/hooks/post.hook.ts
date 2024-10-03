/* eslint-disable prettier/prettier */

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { createPetPost } from "../services/pet-post"
import { TPost } from "../types"
import { downVotePost, upvotePost } from "../services/upvote"



export const useCreatePost = () => {
    return useMutation ({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData : TPost) => await createPetPost(postData),
        onSuccess : () => {
            toast.success("post created successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useUpvotePost = () => {
    return useMutation({
        mutationKey: ["UPVOTE_POST"],
        mutationFn: async (postId: string) => await upvotePost(postId),
        onSuccess: () => {
            toast.success("post upvoted successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useDownVotePost = () => {
    return useMutation({
        mutationKey: ["DOWNVOTE_POST"],
        mutationFn: async (postId: string) => await downVotePost(postId),
        onSuccess: () => {
            toast.success("post downVoted successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}