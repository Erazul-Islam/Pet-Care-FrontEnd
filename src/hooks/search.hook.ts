/* eslint-disable prettier/prettier */
import { useMutation } from "@tanstack/react-query"

import { searchPosts } from "../services/search"
export const useSearchPosts = () => {
    return useMutation({
        mutationKey : ["SEARCH_POSTS"],
        mutationFn : async (searchTerm:string) => searchPosts(searchTerm)
    })
}