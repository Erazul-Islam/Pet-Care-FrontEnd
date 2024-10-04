/* eslint-disable prettier/prettier */

"use server";

import axiosInstance from "@/src/lib/axiosInstance";

// Define the interface for the expected response
interface PaymentIntentResponse {
    client_secret: string; // Ensure this matches the API response structure
}

// Update the paymentService function to return a value
export const paymentService = async (amount: number): Promise<PaymentIntentResponse> => {
    try {
        // Send the amount as part of the request body
        const response = await axiosInstance.post('/payment/create-payment-intent', { amount });

        return response.data as PaymentIntentResponse; 
    } catch (error) {

        throw error;
    }
}
