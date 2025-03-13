/* eslint-disable prettier/prettier */
"use client";

import { useGetSignleProfile } from "@/src/hooks/auth.hook";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const { data } = useGetSignleProfile(id as string);
  console.log(data)

  return <div>this is {params.id}</div>;
};

export default Page;
