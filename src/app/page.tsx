/* eslint-disable prettier/prettier */
"use client"

import GetPost from "../components/posts/get.post";
import { FieldValues,  SubmitHandler, useForm } from "react-hook-form";
import { useSearchPosts } from "../hooks/search.hook";
import { useEffect, useState } from "react";
import { ISearchResult } from "../types";
import useDebounce from "../hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/router";
export default function Home() {

  const { register, handleSubmit, watch } = useForm()
  const { mutate: handleSearchPost, data, isPending, isSuccess } = useSearchPosts()
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([])

  const searchTerm = useDebounce(watch("search"))
  console.log(searchTerm)
  console.log(data)

  useEffect(() => {
    if (searchTerm) {
      handleSearchPost(searchTerm)
    }
  }, [searchTerm])

  // const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data:any) => {
    // handleSeeAll(data.search);

  };

  // const handleSeeAll = (query: string) => {
  //   const queryString = query.trim().split(" ").join("+");

  //   router.push(`/found-items?query=${queryString}`);
  // };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? [])
    }
  }, [isPending, isSuccess, data, searchTerm])

  // const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {

  // }

  return <section>

    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("search")}
            aria-label="Search"
            placeholder="Search"
            className="w-48 items-center"
            type="text"
          />
        </div>
      </form>
      {
        searchResults.length > 0 && (
          <div className="mt-2 w-56 rounded-xl bg-default-100 p-3">
            <div className="space-y-3 ">
              {
                searchResults.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <img
                        alt="item"
                        className="h-20 w-20 rounded-md"
                        src={item.thumbnail}
                      />
                      <div>
                        <p className="text-lg font-semibold">{item.caption}</p>
                        <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
      <GetPost />
    </div>

  </section>;
}
