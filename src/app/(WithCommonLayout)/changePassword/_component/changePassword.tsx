/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { useChangePassword } from '@/src/hooks/auth.hook';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { mutate, reset } = useChangePassword()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({ oldPassword, newPassword })
        reset()
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-pink-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    change Your Password
                </h2>
                <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Old Password</label>
                        <input
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">New Password</label>
                        <input
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-purple-700 text-white p-2 mt-4 rounded"
                        type="submit"
                    >
                        submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;