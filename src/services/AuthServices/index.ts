/* eslint-disable prettier/prettier */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/axiosInstance";
import { TUser } from "@/src/types";

export const registerUser = async (userData: FieldValues) => {
    try {
        // eslint-disable-next-line prettier/prettier
        const data = (await axiosInstance.post("/auth/register", userData)).data;

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
            role: decodedToken.role,
            name: decodedToken.name,
            mobilenumber: decodedToken.mobileNumber,
            address: decodedToken.address,
            profilePhoto: decodedToken.profilePhoto,
            coverPhoto: decodedToken.coverPhoto,
            intro: decodedToken.intro,
            college: decodedToken.college,
            university: decodedToken.university,
            lives: decodedToken.lives,
            from: decodedToken.from,
            followrs: decodedToken.followers,
            following: decodedToken.following
        };
    }

    return decodedToken;
};