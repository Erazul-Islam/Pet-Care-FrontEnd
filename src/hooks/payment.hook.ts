/* eslint-disable prettier/prettier */

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

import { paymentService } from "../services/payment"

interface PaymentIntentResponse {
    client_secret: string;
}

export const useCreatePayment = () => {
    return useMutation <PaymentIntentResponse, Error, number> ({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (amount:number) => await paymentService(amount),
        onSuccess : () => {
            toast.success(" Successfully paid")
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })
}
