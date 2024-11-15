/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
"use client"

import GetPost from "../components/posts/get.post";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSearchPosts } from "../hooks/search.hook";
import { useEffect, useState } from "react";
import { ISearchResult } from "../types";
import useDebounce from "../hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import People from "../components/friend/people";
import Group from "../components/Group/Group";
export default function Home() {

  const { register, handleSubmit, watch } = useForm()
  const { mutate: handleSearchPost, data, isPending, isSuccess } = useSearchPosts()
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([])

  const searchTerm = useDebounce(watch("search"))

  useEffect(() => {
    if (searchTerm) {
      handleSearchPost(searchTerm)
    }
  }, [searchTerm])

  // const router = useRouter()

  console.log("searchResult", searchResults)
  console.log("searchTerm", searchTerm)

  const onSubmit: SubmitHandler<FieldValues> = (_data: any) => {

  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data ?? [])
    }
  }, [isPending, isSuccess, data, searchTerm])

  return <section>

    <section className=" flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4">
        <div className="sticky top-0">
          <People />
        </div>
      </div>
      <div className="pb-0 md:ml-16">
        <div className="overflow-y-scroll h-full no-scrollbar">
          <GetPost />
        </div>
      </div>
      <div className="md:w-1/4 p-4">
        <div className="sticky top-0">
          <Group />
        </div>
      </div>
    </section>
  </section>;
}