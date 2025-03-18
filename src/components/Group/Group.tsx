/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useGetProfile, } from '@/src/hooks/auth.hook';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import {Gift} from 'lucide-react'

const Group = () => {

    const { data } = useGetProfile() || {};
    console.log("con",data)
    const people = Array.isArray(data?.data) ? data?.data : [];
    return (
        <div>
            <div className='lg:ml-32'>
                <div>
                    <div className='ml-3 mt-4'>
                        Birthdays
                    </div>
                    <div className='flex ml-3 mt-4 gap-4'>
                        <Gift size={30} />
                        <h1>Sourav Ahmeds birthday is today</h1>
                    </div>
                </div>
                <div className='mt-4'>
                    <Divider />
                </div>
                <div className='ml-3 mt-4'>
                    Suggestion
                </div>
                <div className='mt-4'>
                    {
                        people?.map((man: any) => {
                            return (<div key={man._id}>
                                <div>
                                    <div className='flex  justify-start gap-4 h-16'>
                                        <div className='relative'>
                                            <Link href={`user-profile/${man._id}`}>
                                            <img className='rounded-full ml-2 w-12 h-12' src={man?.profilePhoto} alt="" /></Link>
                                            <p className='rounded-full absolute bottom-5 left-12 bg-green-600 h-2 w-2' />
                                        </div>
                                        <div className='pt-4'>{man?.name}</div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Group;