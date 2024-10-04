/* eslint-disable prettier/prettier */
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
// import { toast } from "react-toastify";

import { editUserInfo, loginUser, registerUser } from "../services/AuthServices";
import { changePasswordService } from "../services/change_password";
import { TUser } from "../types";

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_SIGNUP"],
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: () => {
            toast.success("User regisration successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await loginUser(userData),
        onSuccess: () => {
            toast.success("User login successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUserProfileUpdate = () => {
    const queryClient = useQueryClient() 

    return useMutation<any, Error, Partial<TUser>>({
        mutationKey: ["PROFILE_UPDATE"],
        mutationFn: async (payload: Partial<TUser>) => await editUserInfo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success("User info updated successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useChangePassword = () => {
    return useMutation({
        mutationFn: (payload: { oldPassword: string, newPassword: string }) => changePasswordService(payload),
        onSuccess: () => {
            toast.success('password changed successfully')
        },
        onError: () => {
            toast.error("Does not work")

        }
    })
}