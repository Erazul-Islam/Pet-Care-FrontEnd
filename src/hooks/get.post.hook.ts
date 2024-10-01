/* eslint-disable prettier/prettier */

import { useQuery } from "@tanstack/react-query";

import { getAllPost } from "../services/get-post";

export const useGetPost = () => {
    return useQuery({
      queryKey: ["GET_POST"],
      queryFn: async () => await getAllPost(),
    });
  };
  

