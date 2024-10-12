/* eslint-disable prettier/prettier */

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { deletePost, getAllPost } from "../services/get-post";



// export const useGetPost = () => {
//     return useInfiniteQuery(
//         ['GET_POSTS'],
//         ({ pageParam = 1 }) => getAllPost(pageParam),
//         {
//             getNextPageParam: (lastPage, pages) => {
//                 const { currentPage, totalPages } = lastPage;

//                 return currentPage < totalPages ? currentPage + 1 : undefined;
//             },
//             staleTime: 1000 * 60 * 5, // 5 minutes
//             cacheTime: 1000 * 60 * 10, // 10 minutes
//         }
//     );
// };

export const useGetPost = () => {
    return useQuery({
        queryKey : ['GET_POSTS'],
        queryFn : async () => await getAllPost()
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