"use client";
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */

import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues, SubmitHandler } from "react-hook-form";

import { useEffect } from "react";

import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";

import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schema/login.schema";
import { Button } from "@nextui-org/button";
import TSForm from "@/src/components/form/Form";
import TSInput from "@/src/components/form/Input";
import Link from "next/link";


/* eslint-disable prettier/prettier */
const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setIsLoading: userLoading } = useUser();

    const redirect = searchParams.get("redirect");

    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleUserLogin(data);
        userLoading(true);
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
            {isPending }
            <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
                <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
                <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
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
                            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                            size="lg"
                            type="submit"
                        >
                            Login
                        </Button>
                    </TSForm>
                    <div className="text-center">
                        Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;