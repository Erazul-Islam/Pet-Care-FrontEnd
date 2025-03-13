/* eslint-disable prettier/prettier */
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
// import { toast } from "react-toastify";

import { deleteUser, editUserInfo, forgetPassword, getAllprofile, getSignleProfile, loginUser, registerUser, resetPassword, userData, userRoleupdate } from "../services/AuthServices";
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

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["GET_USER"],
        queryFn: async () => await getAllprofile(),
    });
};

export const useGetSignleProfile = (id:string) => {
    return useQuery({
        queryKey : ["GET_SINGLE_USER"],
        queryFn : async () => getSignleProfile(id) 
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["DELETE_POST"],
        mutationFn: async (postId: string) => await deleteUser(postId),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success("DELETED");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });
};

export const useUpdateUserRole = () => {
    return useMutation<any, Error, { userId: string }>({
        mutationFn: async ({ userId }) => userRoleupdate(userId),
        onSuccess: () => {
            toast.success("User role updated Successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

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

export const useGetUser = () => {
    return useQuery({
        queryKey: ["GET_USER"],
        queryFn: async () => await userData(),
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

export const useForgetPassword = () => {
    return useMutation({
        mutationFn: (email: string) => forgetPassword(email),
        onSuccess: () => {
            toast.success('Reset link sent to you email')
        },
        onError: (err: any) => {
            toast.error(err.message)
        }
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (payload: { token: string, newPassword: string }) => resetPassword(payload.token, payload.newPassword),
        onSuccess: () => {
            toast.success('Password reset successfully')
        },
        onError: (err: any) => {
            if (err.response?.status === 401) {
                toast.error('Token expired. Please request a new password reset link.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    })
}