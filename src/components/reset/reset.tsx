/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { useResetPassword } from '@/src/hooks/auth.hook';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ResetPassword = () => {

    const { token } = useParams<{ token: string }>()
    const [newPassword, setNewPassword] = useState('')
    const { mutate } = useResetPassword()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!newPassword) {
            toast.message('New password is required')
        }
        setLoading(true)
        mutate({ token: token as string, newPassword }, {
            onSettled: () => setLoading(false)
        })
        router.push('/login')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-pink-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Reset Your Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your new password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-900 text-white font-semibold py-2 px-4 rounded-sm shadow-md transition duration-300 ease-in-out"
                    >
                        {loading ? 'Reseting..' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default ResetPassword;


