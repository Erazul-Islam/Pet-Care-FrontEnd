/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useUser } from '@/src/context/user.provider';
import { useGetUser } from '@/src/hooks/auth.hook';
import React from 'react';

const Group = () => {

    const {user} = useUser()
    console.log(user)

    return (
        <div>
            <div className='mt-12'>
                <div>
                    {
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default Group;