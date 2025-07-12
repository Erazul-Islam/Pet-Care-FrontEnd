/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

import UserProfileSkeleton from "../component/skeleton";

import { useGetSignleProfile } from "@/src/hooks/auth.hook";
import { TFollower } from "@/src/types";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetSignleProfile(id as string);
  const info = data?.data;
  const followers = info?.followers;
  const following = info?.following;

  return (
    <Card className="">
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <div>
          <CardHeader className="text-center justify-center items-center">
            {info?.name}
          </CardHeader>
          <CardBody>
            <img
              src={info?.profilePhoto}
              alt="Profile"
            />
            {/* Follower */}
            <div>
              {followers?.length > 0 ? (
                <div>
                  {" "}
                  <p> Followers </p>
                  {followers?.map((follower: TFollower) => (
                    <div key={follower.id}>
                      <div>
                        <p>{follower.username}</p>
                        {/* <Image
                          src={follower?.profilePhoto}
                          width={100}
                          height={100}
                          alt="Follwer profile photo"
                        /> */}
                      </div>
                    </div>
                  ))}{" "}
                </div>
              ) : (
                "No follower"
              )}
            </div>
            {/* Following */}
            <div>
              {following?.length > 0 ? (
                <div>
                  <p>Following</p>
                  {following?.map((following: TFollower) => (
                    <div key={following?.id}>
                      {" "}
                      <p>{following?.username}</p>{" "}
                    </div>
                  ))}
                </div>
              ) : (
                "No following"
              )}
            </div>
          </CardBody>
        </div>
      )}
    </Card>
  );
};

export default Page;
