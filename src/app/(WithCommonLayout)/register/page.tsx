/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import TSForm from "@/src/components/form/Form";
import TSInput from "@/src/components/form/Input";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schema/register.schema";

const SignupUser = () => {
  const { mutate: handleUserRegistration, isPending} = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };


    handleUserRegistration(userData);
  };
  if (isPending) {

   }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with FoundX</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-[35%]">
        <TSForm
          //! Only for development
          defaultValues={{
            name: "Taosif",
            email: "taosif@gmail.com",
            mobileNumber: "01711223344",
            password: "123456",
            address:'Sahid Tajuddin Ahmod Hall',
            profilePhoto: 'https://ibb.co.com/mhH18dQ'
          }}
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
            <TSInput label="profilePhoto" name="profilePhoto" size="sm" />
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
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
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
