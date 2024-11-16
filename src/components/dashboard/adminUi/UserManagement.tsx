/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"

import Loading from '@/src/app/loading';
import { useDeleteUser, useUpdateUserRole } from '@/src/hooks/auth.hook';
import { useGetPost } from '@/src/hooks/get.post.hook';

import { Button } from '@nextui-org/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface TUserInfo {
    _id: string,
    name: string,
    profilePhoto: string,
    role: string,
    email: string
}

interface ApiResponse<T> {
    statusCode: number;
    status: number;
    success: boolean;
    message: string;
    data: T;
}


const UserManagement = () => {

    const [users, setUsers] = useState<TUserInfo[]>([])
    console.log(users)
    const [loading, setLoading] = useState(false)

    if (!users) {
        setLoading(true)
    }

    if (loading) {
        <Loading />
    }


    const { mutate, } = useDeleteUser()
    const { mutateAsync } = useUpdateUserRole()
    const { refetch } = useGetPost()


    const handleDelete = (userId: string) => {

        mutate(userId)
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        toast.success("User deleted")
        refetch()
    }

    const handleUpdate = (userId: string) => {
        mutateAsync({ userId })
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === userId ? { ...user, role: 'ADMIN' } : user
            )
        )
        toast.success('You made admin')
        refetch()
    }

    useEffect(() => {
        axios.get<ApiResponse<TUserInfo[]>>('https://petcare-lake.vercel.app/api/auth/all-profile')
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Make Admin</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-6">
                                    <img src={user.profilePhoto} alt={user.name} className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {
                                        user?.role === "USER" ?
                                            <button
                                                className="ml-6 rounded-md inline-block px-3 py-1 text-green-700 bg-green-200 text-xs font-semibold"
                                                onClick={() => handleUpdate(user._id)}
                                            >
                                                Make Admin
                                            </button> : <button
                                                className="ml-6 rounded-md inline-block px-3 py-1 bg-red-200 text-red-700 text-xs font-semibold"

                                            >
                                                ADMIN
                                            </button>

                                    }
                                </td>
                                <td>
                                    <Button
                                        className="ml-6 rounded-md bg-red-500 hover:bg-red-600 text-white transition duration-300 transform hover:scale-105"
                                        color="warning"
                                        onClick={() => handleDelete(user?._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;