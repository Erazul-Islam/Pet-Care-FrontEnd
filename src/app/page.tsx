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
    // handleSeeAll(data.search);

  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data ?? [])
    }
  }, [isPending, isSuccess, data, searchTerm])

  // const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {

  // }

  return <section>
    {/* <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md">
              <Input
                {...register("search")}
                aria-label="Search"
                className="w-full pl-10 pr-4 py-2 rounded-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>

        </div>
      </form>
      {
        searchResults.length > 0 && (
          <div className="mt-2 absolute items-center justify-center w-56 rounded-sm bg-default-100 p-3">
            <div className="space-y-3 items-center justify-center ">
              {
                searchResults.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4">
                      <img
                        alt="item"
                        className="h-20 w-20 rounded-md"
                        src={item.photo}
                      />
                      <div>
                        <p className="text-sm font-semibold">{item.caption.substring(0, 30)}</p>
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
    </div> */}

    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-md">
            <Input
              {...register("search")}
              aria-label="Search"
              className="w-[400px]  mt-12 mb-12 ml-6 border border-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search posts"
              type="text"
            />
          </div>
        </div>
      </form>

      {/* Loading spinner for search results */}
      {isPending && (
        <div className="flex items-center justify-center mt-2">
          <Spinner color="primary" size="md" />
        </div>
      )}

      {/* Render search results */}
      {searchResults.length > 0 && !isPending && (
        <div className="mt-2 absolute lg:left-96 z-10 w-full max-w-md shadow-lg rounded-md">
          <div className="p-4">
            {searchResults.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-2 hover: rounded-md">
                <img
                  alt={item.caption}
                  className="h-16 w-16 rounded-md object-cover"
                  src={item.photo}
                />
                <div>
                  <p className="text-sm font-semibold">{item.caption.substring(0, 30)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Main post section */}
      <GetPost />
    </div>

  </section>;
}
