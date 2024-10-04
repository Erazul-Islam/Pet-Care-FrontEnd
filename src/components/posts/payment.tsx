/* eslint-disable prettier/prettier */

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

import { useCreatePayment } from '@/src/hooks/payment.hook';

const Payment = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { mutateAsync } = useCreatePayment()
    const stripe = useStripe()
    const elements = useElements()

    const toggleModal = () => setIsOpen(!isOpen);

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.error('Stripe or Elements not initialized.');

            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error('Card Element not found.');

            return;
        }

        try {
            // Trigger the payment creation via the mutate function
            const response = await mutateAsync(100);
            console.log(response)
            const clientSecret = response?.data.client_secret;

            if (!clientSecret) {
                throw new Error('Failed to retrieve client secret.');
            }

            // Confirm the payment using Stripe's confirmCardPayment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            // If payment is successful, close the modal
            if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };


    return (
        <>
            {/* Button to Open Modal */}
            <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={toggleModal}
            >
                pay
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-sky-900 rounded-lg shadow-lg w-11/12 max-w-md">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                            <h2 className="text-lg  font-bold">Confirm Payment</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-4 py-6">
                            <CardElement />
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end px-4 py-2 border-t">
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;