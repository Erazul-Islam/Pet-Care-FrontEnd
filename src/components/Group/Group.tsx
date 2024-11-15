/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useGetProfile, } from '@/src/hooks/auth.hook';
import { Divider } from '@nextui-org/react';
import React from 'react';
import { FaGift } from "react-icons/fa6";

const Group = () => {

    const { data } = useGetProfile() || {};
    const people = Array.isArray(data?.data) ? data?.data : [];

    return (
        <div>
            <div className='lg:ml-32'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='ml-3'>Friend Requests</h1>
                        <h1 className='text-pink-500'>See All</h1>
                    </div>
                    <div className='ml-3 mt-4'>
                        <div className='flex gap-4'>
                            <img className='rounded-full w-10 h-10' src="https://i.ibb.co.com/NmcQz8p/Fiverr-fotor-20241106161818.png" alt="" />
                            <h1 className='mt-2'>Erazul islam Taosif</h1>
                        </div>
                        <div className='mt-4 ml-14'>
                            <button className='bg-pink-500 rounded-sm h-8 w-20'>Confirm</button>
                            <button className='bg-red-700 ml-4 rounded-sm h-8 w-20 '>Delete</button>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Divider />
                    </div>
                </div>
                <div>
                    <div className='ml-3 mt-4'>
                        Birthdays
                    </div>
                    <div className='flex ml-3 mt-4 gap-4'>
                        <FaGift size={30} />
                        <h1>Sourav Ahmeds birthday is today</h1>
                    </div>
                </div>
                <div className='mt-4'>
                    <Divider />
                </div>
                <div className='ml-3 mt-4'>
                    Friends
                </div>
                <div className='mt-4'>
                    {
                        people?.map((man: any) => {
                            return (<div key={man._id}>
                                <div>
                                    <div className='flex  justify-start gap-4 h-16'>
                                        <div className='relative'>
                                            <img className='rounded-full ml-2 w-12 h-12' src={man?.profilePhoto} alt="" />
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