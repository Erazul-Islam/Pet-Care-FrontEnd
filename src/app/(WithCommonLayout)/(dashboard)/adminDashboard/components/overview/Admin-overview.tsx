/* eslint-disable prettier/prettier */
import React from 'react';

import Stat from './Stat';

import { useUser } from '@/src/context/user.provider';

const AdminOverView = () => {

    const {user} = useUser()

    return (
        <div className='lg:mr-12'>
            <h1 className='font-semibold text-2xl'>Welcome back, {user?.name}</h1>
            <Stat/>
        </div>
    );
};

export default AdminOverView;