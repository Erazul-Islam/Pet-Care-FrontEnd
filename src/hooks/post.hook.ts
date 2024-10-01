/* eslint-disable prettier/prettier */

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { createPetPost } from "../services/pet-post"
import { TPost } from "../types"



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