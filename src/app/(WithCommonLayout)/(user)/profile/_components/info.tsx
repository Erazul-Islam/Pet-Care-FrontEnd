/* eslint-disable prettier/prettier */

"use client"

import React, { useState } from 'react';
import { Button } from '@nextui-org/button'


import { useGetUser, useUserProfileUpdate } from '@/src/hooks/auth.hook';



const Info = () => {



    const { data: userData, refetch } = useGetUser()
    const { mutateAsync: updateProfile, } = useUserProfileUpdate()
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
        coverPhoto: userData?.data.coverPhoto
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        updateProfile(formData, {
            onSuccess: () => {
                refetch()
                window.location.reload()
            }
        })
        setModalVisible(false);
        refetch()
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
                        <h2 className="text-3xl font-bold">{userData?.data?.name}</h2>
                        <p className="">{userData?.data?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <h1 className="font-semibold">{userData?.data.followers.length} followers</h1>
                            <span className="text-gray-400">•</span>
                            <h2 className="font-semibold">{userData?.data.following.length} following</h2>
                        </div>
                        <Button
                            className="mt-4"
                            onClick={() => setModalVisible(true)}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold">About</h3>
                    <p className="mt-2">{userData?.data?.intro}</p>
                    <p className="mt-1"><strong>Address:</strong> {userData?.data?.address}</p>
                    <p className="mt-1"><strong>College:</strong> {userData?.data?.college}</p>
                    <p className="mt-1"><strong>Mobile:</strong> {userData?.data?.mobileNumber}</p>
                    <p className="mt-1"><strong>From:</strong> {userData?.data?.from}</p>
                    <p className="mt-1"><strong>Lives in:</strong> {userData?.data?.lives}</p>
                    <p className="mt-1"><strong>University:</strong> {userData?.data?.university}</p>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Followers</h3>
                        <div className='mt-3 grid grid-cols-2'>
                            {
                                userData?.data?.followers.map((follower) => (<div key={follower._id}>
                                    <img className='h-40 w-40' src={follower.profilePhoto} alt="" />
                                    <h1 className='mt-2 ml-8 font-bold'>{follower.username}</h1>
                                    {/* <h1>{follower.email}</h1> */}
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Following</h3>
                        <div className='mt-3 grid-cols-2'>
                            {
                                userData?.data?.following.map((follower) => (<div  key={follower._id}>
                                    <img className='h-40 w-40' src={follower.profilePhoto} alt="" />
                                    <h1 className='mt-2 ml-8 font-bold'>{follower.username}</h1>
                                    {/* <h1>{follower.email}</h1> */}
                                </div>))
                            }
                        </div>
                    </div>
                </div>
                {modalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md z-10">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
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
                                    {/* <input
                                        className="border p-2 rounded"
                                        name="coverPhoto"
                                        placeholder="cover"
                                        type="text"
                                        value={formData.coverPhoto}
                                        onChange={handleChange}
                                    /> */}
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
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        type="submit"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;