/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import TSForm from "@/src/components/form/Form";
import TSInput from "@/src/components/form/Input";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schema/register.schema";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SignupUser = () => {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      role: "USER"
    };
    setLoading(true)
    handleUserRegistration(userData, {
      onSettled: () => setLoading(false)
    });
    router.push('/login')
  };
  if (isPending) {

  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl text-pink-500 font-bold">Please Sign up</h3>
      <div className="w-[35%]">
        <TSForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <TSInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <TSInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <TSInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div>
          <div className="py-3">
            <TSInput label="Address" name="address" size="sm" />
          </div>
          <div className="py-3">
            <TSInput label="profilePhotoUrl" name="profilePhoto" size="sm" />
          </div>
          <div className="py-3">
            <TSInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <Button
            className="my-3 w-full rounded-sm bg-pink-600 text-white"
            size="lg"
            type="submit"
          >
            {loading ? <Spinner /> : 'Registration'}
          </Button>
        </TSForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;
