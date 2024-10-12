/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */

"use client"


import React, { useState } from 'react';

import { useForgetPassword } from '@/src/hooks/auth.hook';

const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const { mutate } = useForgetPassword()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(email)
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-pink-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Reset Your Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-2">
                            Enter Your Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-sm shadow-md transition duration-300 ease-in-out"
                    >
                        Send Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;