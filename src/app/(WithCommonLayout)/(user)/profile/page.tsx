/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useUser } from '@/src/context/user.provider'
import React from 'react';

import { Spinner } from '@nextui-org/react';
import PetMarkDownEditor from './_components/pet-post';

const UserProfile = () => {


    const { user, isLoading } = useUser()

    return (
        <div className="p-4">
            {isLoading ? (
                <Spinner size="lg" />
            ) : (
                <>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p>Email: {user?.email}</p>
                    <p>Mobile: {user?.mobileNumber}</p>
                    <img className='w-52' src={user?.profilePhoto} alt={user?.name} />
                    <PetMarkDownEditor />
                </>
            )}
        </div>
    );
};

export default UserProfile;