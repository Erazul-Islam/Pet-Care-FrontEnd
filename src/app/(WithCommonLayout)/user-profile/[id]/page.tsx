/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader, } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

import { useGetSignleProfile } from "@/src/hooks/auth.hook";
import Image from "next/image";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const { data,isLoading } = useGetSignleProfile(id as string);
  const info = data?.data 
  console.log(info)

  return <Card className=" lg:w-[300px] rounded-md ml-10 mr-6">
            <CardHeader className="text-center justify-center items-center">
                { info?.name }
            </CardHeader>
            <CardBody>
                <Image src={info?.profilePhoto} width={100} height={100} alt="Profile Photo" />
            </CardBody>
  </Card>;
};

export default Page;
