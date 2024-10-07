/* eslint-disable prettier/prettier */

"use client"

import { useDeleteUser, useGetProfile, useUpdateUserRole } from '@/src/hooks/auth.hook';

import { Button } from '@nextui-org/button';
import React from 'react';

const Adminpage = () => {

    const { data, refetch } = useGetProfile()

    const { mutateAsync } = useUpdateUserRole()

    const { mutate } = useDeleteUser()

    const handleUpdate = (userId: string) => {
        mutateAsync({ userId })
        refetch()
        // window.location.reload()
    }

    const handleDelete = (userId: string) => {
        mutate(userId)
        refetch()
    }



    return (
        <div>
            <div className='grid lg:grid-cols-3 lg:ml-80 lg:mr-60'>
                {
                    data?.data?.map((one) => (<div key={one._id}>
                        <div>
                            <h1>{one.name}</h1>
                            <img className='w-40 rounded-sm h-40' src={one.profilePhoto} alt="" />
                            {
                                one.role === "USER" ? <Button color='secondary' className='mt-3 ml-7' onClick={() => handleUpdate(one._id)} >Make Admin</Button> : <Button color='secondary' className='mt-3 ml-7'>{one.role}</Button>
                            } <br />
                            <Button className='mt-3 ml-7' color='warning' onClick={() => handleDelete(one._id)}>Delete</Button>
                        </div>
                    </div>))
                }
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Adminpage;