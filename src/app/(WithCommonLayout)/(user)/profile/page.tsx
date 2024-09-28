/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import { useUser } from '@/src/context/user.provider'
import React from 'react';

const UserProfile = () => {


    const {user} = useUser()

    return (
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.mobileNumber}</p>
            <img className=' h-16 rounded-md' src={user?.profilePhoto} alt="" />
        </div>
    );
};

export default UserProfile;