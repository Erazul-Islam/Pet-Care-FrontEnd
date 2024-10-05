/* eslint-disable prettier/prettier */

"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button'
import { useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/src/context/user.provider';
import { useUserProfileUpdate } from '@/src/hooks/auth.hook';
import { useGetPost } from '@/src/hooks/get.post.hook';



const Info = () => {

    const { user, } = useUser()
    console.log(user)
    const {refetch} = useGetPost()
    const { mutateAsync: updateProfile, } = useUserProfileUpdate()
    const [modalVisible, setModalVisible] = useState(false);
    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        name: user?.name,
        address: user?.address,
        college: user?.college,
        mobileNumber: user?.mobileNumber,
        from: user?.from,
        lives: user?.lives,
        intro : user?.intro,
        university: user?.university,
        coverPhoto: user?.coverPhoto
    });

    console.log(formData)

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        updateProfile(formData)
        refetch()
        queryClient.invalidateQueries()
        setModalVisible(false);
    };


    return (
        <div>
            <div className=" p-5 rounded-lg shadow-md">
                <div className="flex gap-6">
                    <img
                        alt={user?.name}
                        className="rounded-full w-40 h-40 object-cover border-2 border-gray-300"
                        src={user?.profilePhoto}
                    />
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-bold">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <h1 className="font-semibold">21K followers</h1>
                            <span className="text-gray-400">•</span>
                            <h2 className="font-semibold">36 following</h2>
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
                    <p className="mt-2">{user?.intro}</p>
                    <p className="mt-1"><strong>Address:</strong> {user?.address}</p>
                    <p className="mt-1"><strong>College:</strong> {user?.college}</p>
                    <p className="mt-1"><strong>Mobile:</strong> {user?.mobileNumber}</p>
                    <p className="mt-1"><strong>From:</strong> {user?.from}</p>
                    <p className="mt-1"><strong>Lives in:</strong> {user?.lives}</p>
                    <p className="mt-1"><strong>University:</strong> {user?.university}</p>
                </div>
                {modalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md z-10">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-4">
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="college"
                                        placeholder="College"
                                        value={formData.college}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="coverPhoto"
                                        placeholder="cover"
                                        value={formData.coverPhoto}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="from"
                                        placeholder="From"
                                        value={formData.from}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="lives"
                                        placeholder="Lives in"
                                        value={formData.lives}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border p-2 rounded"
                                        type="text"
                                        name="university"
                                        placeholder="University"
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
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
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