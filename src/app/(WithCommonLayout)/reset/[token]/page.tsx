/* eslint-disable prettier/prettier */


"use client"

import { NextPage } from 'next';
import React from 'react';

import ResetPassword from '@/src/components/reset/reset';

const ResetPasswordPage: NextPage = () => {
    return (
        <div>
            <ResetPassword />
        </div>
    );
};

export default ResetPasswordPage;