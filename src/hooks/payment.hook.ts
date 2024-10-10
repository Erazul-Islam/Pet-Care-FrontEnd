/* eslint-disable prettier/prettier */

import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";

import { paymentHistory, paymentService } from "../services/payment"

interface PaymentIntentResponse {
    [x: string]: any;
    client_secret: string;
}

export const useCreatePayment = () => {
    return useMutation <PaymentIntentResponse, Error, number> ({
        mutationKey: ["CREATE_PAYMENT"],
        mutationFn: async (amount:number) => await paymentService(amount),
        onSuccess : () => {
            toast.success(" Successfully paid")
        },
        onError: (error) => {
            toast.error(error.message)
            // console.log(error)
        }
    })
}

export const useGetHistory = () => {
    return useQuery({
        queryKey : ['HISTORY'],
        queryFn : async () => await paymentHistory()
    })
}
