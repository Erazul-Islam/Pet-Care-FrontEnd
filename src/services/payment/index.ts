/* eslint-disable prettier/prettier */

"use server";

import axiosInstance from "@/src/lib/axiosInstance";
interface PaymentIntentResponse {
    client_secret: string; 
}

export const paymentService = async (amount: number): Promise<PaymentIntentResponse> => {
    try {
        const response = await axiosInstance.post('/payment/create-payment-intent', { amount });

        console.log(response)

        return response.data as PaymentIntentResponse; 
    } catch (error) {

        throw error;
    }
}

export const paymentHistory = async () => {
    try {
        const response = await axiosInstance.get('payment/payment-history')

        console.log(response.data)

        return response.data
    }
    catch (err){

    }
}
