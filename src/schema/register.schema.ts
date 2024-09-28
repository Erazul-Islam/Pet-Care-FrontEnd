/* eslint-disable prettier/prettier */
import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    profilePhoto: z.string().min(1, "Profile photo is required").url("Profile photo must be a valid URL."),
    address: z.string().min(1, "Address is required"),
    // role:z.string().min(1),
    mobileNumber: z
        .string()
        .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
    password: z.string().min(6, "Must be at least 6 characters."),
});

export default registerValidationSchema;