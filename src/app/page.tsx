/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
"use client";

import GetPost from "../components/posts/get.post";
import { useForm } from "react-hook-form";
import { useSearchPosts } from "../hooks/search.hook";
import { useEffect, useState } from "react";
import { ISearchResult } from "../types";
import useDebounce from "../hooks/debounce.hook";
export default function Home() {
  const { watch } = useForm();
  const {
    mutate: handleSearchPost,
    data,
    isPending,
    isSuccess,
  } = useSearchPosts();
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);

  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm) {
      handleSearchPost(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  return (
    <section>
      <GetPost />
    </section>
  );
}
