/* eslint-disable prettier/prettier */
"use client";
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */

import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { useUserLogin } from "@/src/hooks/auth.hook";

import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schema/login.schema";
import { Button } from "@nextui-org/button";
import TSForm from "@/src/components/form/Form";
import TSInput from "@/src/components/form/Input";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";


/* eslint-disable prettier/prettier */
const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    // const { setIsLoading: userLoading } = useUser();

    const redirect = searchParams.get("redirect");

    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
    const [loading,setLoading] = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        handleUserLogin(data,{
            onSettled : () => setLoading(false)
        });
        // userLoading(true);
    };

    useEffect(() => {
        if (!isPending && isSuccess) {
            if (redirect) {
                router.push(redirect);
            } else {
                router.push("/");
            }
        }
    }, [isPending, isSuccess]);

    return (
        <>
            {isPending}
            <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
                <h3 className="my-2 text-2xl text-pink-700 font-bold">Please log in</h3>
                <p className="mb-4"></p>
                <div className="w-[35%]">
                    <TSForm
                        resolver={zodResolver(loginValidationSchema)}
                        onSubmit={onSubmit}
                    >
                        <div className="py-3">
                            <TSInput label="Email" name="email" type="email" />
                        </div>
                        <div className="py-3">
                            <TSInput label="Password" name="password" type="password" />
                        </div>

                        <Button
                            className="my-3 w-full rounded-sm  bg-pink-700 font-semibold text-white"
                            size="lg"
                            type="submit"
                        >
                            {loading ? <Spinner/> : 'Login'}
                        </Button>
                    </TSForm>
                    <div className="md:flex justify-evenly">
                        <div className="text-center">
                            Don&lsquo;t have account ? <Link href={"/register"}> <p className="text-pink-500">Register</p> </Link>
                        </div>
                        <div className="text-center">
                            Forget Password? <Link href={"/reset"}> <p className="text-pink-500">Reset password</p> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;