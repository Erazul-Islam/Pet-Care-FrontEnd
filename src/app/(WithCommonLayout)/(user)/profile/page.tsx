/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useUser } from '@/src/context/user.provider'
import React from 'react';

import { Image, } from '@nextui-org/react';
import PetMarkDownEditor from './_components/pet-post';
import { useGetPost } from '@/src/hooks/get.post.hook';


const UserProfile = () => {


    const { user } = useUser()
    // console.log(user)

    const { data } = useGetPost()
    // console.log(data)

    const filterData = data?.data?.filter((one) => one?.userEmail === user?.email)

    return (
        <div className="p-4">
            <div className='lg:flex justify-between'>
                <div className='flex gap-6'>
                    <Image alt='name' className='rounded-full' height={200} src={user?.profilePhoto} width={200} />
                    <div className=''>
                        <h2 className="text-2xl mt-16 font-bold">{user?.name}</h2>
                        <p>Email: {user?.email}</p>
                        <div>
                            <h1>21K followers</h1>
                            <h2>36 following</h2>
                        </div>
                    </div>
                </div>
                <PetMarkDownEditor />
            </div>
            <div className='mt-4 lg:ml-[600px]'>
                {
                    filterData?.length === 0 ? <h1>No post you have</h1> : filterData?.map((one) => <div key={one._id}>
                        <div
                            key={one._id}
                            className="bg-white mt-6 shadow-md rounded-lg p-4 max-w-md w-full"
                        >
                            {/* User Info and Follow Button */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        alt="User avatar"
                                        className="w-10 h-10 rounded-full"
                                        src={one.userProfilePhoto}
                                    />
                                    <div>
                                        <h4 className="text-black">{one.userName}</h4>
                                        <p className="text-xs text-gray-500">{new Date(one.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold text-emerald-800 text-lg">{one.caption}</h3>
                                <p className="text-sm mt-3 text-gray-700">{one.description}</p>
                            </div>
                            {one.photo && (
                                <img
                                    alt={one.caption}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                    src={one.photo}
                                />
                            )}

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default UserProfile;