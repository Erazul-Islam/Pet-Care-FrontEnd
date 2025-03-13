/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";

import { useGetUser, useUserProfileUpdate } from "@/src/hooks/auth.hook";
import { Avatar, Modal, ModalContent } from "@nextui-org/react";
import { useAcceptFriendRequest } from "@/src/hooks/friend.request.hook";
import EditProfileModal from "./edit-profile-modal";

export interface TFollow {
  id: string;
  _id: string;
  username: string;
  profilePhoto: string;
}

export interface TFriendRequest {
  sender: string;
  status: string;
  senderProfilePhoto: string;
  senderName: string;
  _id: string;
}

export interface TFriend {
  email: string;
  username: string;
  profilePhoto: string;
  _id: string;
  id: string;
}

const Info = () => {
  const { data: userData, refetch } = useGetUser();
  const { mutateAsync: updateProfile } = useUserProfileUpdate();
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: userData?.data.name,
    address: userData?.data.address,
    college: userData?.data.college,
    mobileNumber: userData?.data.mobileNumber,
    from: userData?.data.from,
    lives: userData?.data.lives,
    intro: userData?.data.intro,
    profilePhoto: userData?.data.profilePhoto,
    university: userData?.data.university,
    coverPhoto: userData?.data.coverPhoto,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateProfile(formData);
    setModalVisible(false);
    refetch();
  };

  const friendRequest = userData?.data?.friendRequest;
  const friend = userData?.data?.friend;

  const userId = userData?.data?._id;

  const handleAccepFriendRequest = async (senderId: string) => {
    console.log(senderId);

    if (!userId || !senderId) {
      return;
    }

    await acceptFriendRequest({ userId, senderId });
  };

  return (
    <div>
      <div className=" p-5 rounded-lg shadow-md">
        <div className="flex gap-6">
          <img
            alt={userData?.data?.name}
            className="rounded-full w-40 h-40 object-cover border-2 border-gray-300"
            src={userData?.data?.profilePhoto}
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl text-pink-600 font-bold">
              {userData?.data?.name}
            </h2>
            <p className="">{userData?.data?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <h1 className="font-semibold">
                {userData?.data?.followers?.length} followers
              </h1>
              <span className="text-gray-400">•</span>
              <h2 className="font-semibold">
                {userData?.data?.following?.length} following
              </h2>
            </div>
            <Button
              color="warning"
              className="mt-4 text-white rounded-sm"
              onClick={() => setModalVisible(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="mt-4 text-center text-xl font-bold text-emerald-500">
            {userData?.data?.intro}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">Address </strong>{" "}
            {userData?.data?.address}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">College:</strong>{" "}
            {userData?.data?.college}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">Mobile:</strong>{" "}
            {userData?.data?.mobileNumber}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">From:</strong>{" "}
            {userData?.data?.from}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">Lives in:</strong>{" "}
            {userData?.data?.lives}
          </p>
          <p className="mt-3">
            <strong className="text-purple-500">University:</strong>{" "}
            {userData?.data?.university}
          </p>
          <div className="mt-12">
            <h3 className="text-xl font-semibold">Followers</h3>
            <div className=" grid grid-cols-3 gap-y-14">
              {userData?.data?.followers?.map((follower: TFollow) => (
                <div className="" key={follower._id}>
                  <div className="gap-6 h-16">
                    <div>
                      <img
                        className="mt-3 h-24 w-24"
                        src={follower.profilePhoto}
                        alt=""
                      />
                      <h1 className=" text-sm mt-1 text-pink-500  ">
                        {follower.username}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-xl font-semibold">Following</h3>
            <div className="mt-3">
              {userData?.data?.following?.map((follower: TFollow) => (
                <div key={follower._id}>
                  <div className="flex gap-4 justify-between border h-16 border-white">
                    <Avatar
                      className="mt-3 ml-8"
                      src={follower.profilePhoto}
                      alt=""
                    />
                    <h1 className="mt-4 mr-8 text-pink-500 ml-8 font-bold">
                      {follower.username}
                    </h1>
                    {/* <Button color='warning' className='rounded-sm text-white mt-2 mr-5'>Unfollow</Button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold">Friend Request</h3>
            <div className="mt-3">
              {friendRequest?.map((friend: TFriendRequest) => (
                <div key={friend._id}>
                  <div className="flex gap-4 justify-between border h-16 border-white">
                    <Avatar
                      className="mt-3 ml-8"
                      src={friend.senderProfilePhoto}
                      alt=""
                    />
                    <h1 className="mt-4 mr-8 text-pink-500 ml-8 font-bold">
                      {friend.senderName}
                    </h1>
                    {friend.status === "accepted" ? (
                      <button className="rounded-sm bg-purple-800 w-20 h-6 text-white mt-5 mr-5">
                        Accepted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAccepFriendRequest(friend.sender)}
                        color="warning"
                        className="rounded-sm bg-pink-700 w-16 h-6 text-white mt-5 mr-5"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold">Friends</h3>
            <div className="mt-3">
              {friend?.map((friend: TFriend) => (
                <div key={friend._id}>
                  <div className="flex gap-4 justify-between border h-16 border-white">
                    <Avatar
                      className="mt-3 ml-8"
                      src={friend.profilePhoto}
                      alt=""
                    />
                    <h1 className="mt-4 mr-8 text-pink-500 ml-8 font-bold">
                      {friend.username}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {modalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md z-10">
                            <h2 className="text-xl text-yellow-400 font-bold mb-4">Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-4">
                                    <input
                                        className="border p-2 rounded"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="address"
                                        placeholder="Address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="intro"
                                        placeholder="Introduction"
                                        type="text"
                                        value={formData.intro}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="college"
                                        placeholder="College"
                                        type="text"
                                        value={formData.college}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="profilePhoto"
                                        placeholder="profile photo url"
                                        type="text"
                                        value={formData.profilePhoto}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        type="text"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="from"
                                        placeholder="From"
                                        type="text"
                                        value={formData.from}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        name="lives"
                                        placeholder="Lives in"
                                        type="text"
                                        value={formData.lives}
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="border p-2 rounded"
                                        name="university"
                                        placeholder="University"
                                        type="text"
                                        value={formData.university}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                                        type="button"
                                        onClick={() => setModalVisible(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-purple-600 text-white px-4 py-2 rounded"
                                        type="submit"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )} */}
      </div>
      <EditProfileModal
        modalVisible={modalVisible}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default Info;
