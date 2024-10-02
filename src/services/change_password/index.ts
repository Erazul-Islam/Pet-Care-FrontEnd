/* eslint-disable prettier/prettier */

"use server"

import axiosInstance from "@/src/lib/axiosInstance"

export interface ChangePasswordPayload {
    oldPassword: string,
    newPassword: string
}

export const changePasswordService = async (payload: ChangePasswordPayload) => {
    const { data } = await axiosInstance.post('/auth/change-password', payload)

    return data
}