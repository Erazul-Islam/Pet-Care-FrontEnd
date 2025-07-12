"use client";

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import TSForm from "@/src/components/form/Form";
import TSInput from "@/src/components/form/Input";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schema/register.schema";

const SignupUser = () => {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const router = useRouter();
  const { register } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);

    const file = data.profilePhoto?.[0];
    console.log("file", file);
    console.log("photo", data.profilePhoto);
    formData.append("profilePhoto", file);

    handleUserRegistration(formData);
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h3 className="my-2 text-xl text-pink-500 font-bold">Please Sign up</h3>
      <div>
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
            <input
              type="file"
              accept="image/*"
              {...register("profilePhoto")}
              className="block w-full text-sm bg-transparent border border-gray-700 rounded-md p-2"
            />
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
            {isPending ? <Spinner /> : "Registration"}
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
