/* eslint-disable prettier/prettier */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/axiosInstance";
import { TUser } from "@/src/types";

export const registerUser = async (formData : FormData) => {
    try {
        // eslint-disable-next-line prettier/prettier
        const data = (await axiosInstance.post("/auth/register", formData,{
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })).data;

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};


export const editUserInfo = async (payload: Partial<TUser>) => {
    const response = await axiosInstance.put('/auth/me', payload)

    return response.data

}

export const getAllprofile = async () => {
    const {data} = await axiosInstance.get('/auth/all-profile')

    return data
}

export const getSignleProfile = async (id : string) => {
    const {data} = await axiosInstance.get(`/auth/users/${id}`)

    return data
}

export const deleteUser = async (userId: string) => {

    const response = await axiosInstance.delete(`/auth/${userId}`)

    return response.data
}

export const userRoleupdate = async (userId: string) => {
    const response = await axiosInstance.patch(`/auth/${userId}`)

    return response.data
}


export const userData = async () => {
    const response = await axiosInstance.get('/auth/me')

    return response.data
}


export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);

        if (data.success) {
            cookies().set("accessToken", data?.accessToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const logout = () => {
    cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);

        return {
            _id: decodedToken._id,
            email: decodedToken.email,
            password: decodedToken.password,
            role: decodedToken.role,
            name: decodedToken.name,
            mobileNumber: decodedToken.mobileNumber,
            address: decodedToken.address,
            profilePhoto: decodedToken.profilePhoto,
            coverPhoto: decodedToken.coverPhoto,
            intro: decodedToken.intro,
            college: decodedToken.college,
            university: decodedToken.university,
            lives: decodedToken.lives,
            from: decodedToken.from,
            followers: decodedToken.followers,
            following: decodedToken.following,
            createdAt: decodedToken.createdAt,
            updatedAt: decodedToken.updatedAt,
            needsPasswordChange: decodedToken?.needsPasswordChange
        };
    }

    return decodedToken;
};


export const forgetPassword = async (email: string) => {
    const response = await axiosInstance.post('/auth/forget-password', { email })

    return response.data
}

export const resetPassword = async (token: string, newPassword: string) => {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password: newPassword })

    return response.data
}