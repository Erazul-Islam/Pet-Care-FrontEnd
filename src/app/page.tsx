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
    <div
      className="relative min-h-screen bg-cover bg-center bg-animate"
      style={{ backgroundImage: 'url("https://i.ibb.co/BNWYps3/home-hero-01-1.jpg")' }}
    >
      <style>{`
@keyframes backgroundSlide {
0% {
  background-image: url("https://i.ibb.co/BNWYps3/home-hero-01-1.jpg");
}
33% {
  background-image: url("https://i.ibb.co.com/pJPYTTP/home-hero-02.jpg"); /* Replace with your second image URL */
}
66% {
  background-image: url("https://i.ibb.co.com/K7P2kdD/home-hero-03.jpg"); /* Replace with your third image URL */
}
100% {
  background-image: url("https://i.ibb.co/BNWYps3/home-hero-01-1.jpg"); /* Back to first image */
}
}

.bg-animate {
animation: backgroundSlide 15s ease-in-out infinite;
background-size: cover;
background-position: center;
}
`}
      </style>


      <div className="flex flex-col items-center justify-center min-h-[50vh] pt-24 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-4">
          <div className="w-full">
            <Input
              {...register("search")}
              aria-label="Search"
              color="primary"
              className="w-full max-w-full p-4 rounded-md border border-transparent bg-none bg-opacity-80  focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-50 shadow-lg"
              placeholder="Search posts"
              type="text"
            />
          </div>
        </form>
        {isPending && (
          <div className="flex items-center justify-center mt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}
        {searchResults.length > 0 && !isPending && (
          <div className="w-full max-w-md mt-4 z-10 shadow-lg  bg-opacity-90 rounded-md">
            <div className="p-4">
              {searchResults.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-2  rounded-md transition-all duration-200">
                  <img
                    alt={item.caption}
                    className="h-20 w-20 rounded-md object-cover"
                    src={item.photo}
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.caption.substring(0, 40)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="md:flex justify-evenly">
      <People/>
      <GetPost />
      <Group/>
    </div>
  </section>;
}
