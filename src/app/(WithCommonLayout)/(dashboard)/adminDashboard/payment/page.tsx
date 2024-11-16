/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

'use client'

import { useGetHistory } from '@/src/hooks/payment.hook';

import React from 'react';

interface TMetaData {
    _id: string,
    amount: number,
    created: number,
    metadata: {
        userName: string,
        userEmail: string,
        userProfilePhoto: string
    }
}

const PaymentInfo = () => {

    const { data: history } = useGetHistory()

    return (
        <div>
            <div className='grid items-center justify-center cursor-pointer lg:grid-cols-3 gap-6 p-6'>
                {history?.data?.length > 0 ? (
                    history?.data?.map((one: TMetaData) => (
                        <div key={one._id} className=' shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105'>
                            <img className='w-24 h-24 rounded-md mb-4 object-cover mx-auto' src={one.metadata.userProfilePhoto} alt={`${one.metadata.userName}'s profile`} />
                            <h3 className='text-xl text-purple-500 font-semibold text-center mb-2'>{one.metadata.userName}</h3>
                            <p className=' text-cyan-600 text-center'>Email: {one.metadata.userEmail}</p>
                            <p className='text-green-500 text-center font-bold mt-2'>Amount: ${one.amount / 100}</p>
                            <p className='text-pink-600 text-center'>Payment Created: {new Date(one.created * 1000).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-center col-span-full'>No payment history available.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentInfo;