/* eslint-disable prettier/prettier */

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { createPetPost } from "../services/pet-post"



export const useCreatePost = () => {
    return useMutation<any,Error,FormData> ({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData) => await createPetPost(postData),
        onSuccess : () => {
            toast.success("post created successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}