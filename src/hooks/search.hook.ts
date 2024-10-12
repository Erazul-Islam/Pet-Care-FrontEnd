/* eslint-disable prettier/prettier */
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { searchPosts } from "../services/search"
export const useSearchPosts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey : ["SEARCH_POSTS"],
        mutationFn : async (searchTerm:string) => searchPosts(searchTerm),
        onSuccess : () => {
            queryClient.invalidateQueries()
        }
    })
}