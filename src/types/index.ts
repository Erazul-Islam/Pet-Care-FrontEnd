/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}
export interface IUser {
  // _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type TPost = {
  userName: string,
  userId: string,
  userProfilePhoto: string,
  userEmail: string,
  caption: string,
  description: string,
  photo: string,
  category: string,
  comments : TComment[]
}

// export interface TUser {
//   _id: string,
//   name: string,
//   email: string,
//   password: string,
//   mobileNumber: string,
//   profilePhoto: string,
//   address: string,
//   role: 'ADMIN' | 'USER'
// };

export type TComment = {
  userId : string,
  userName : string
  userProfilePhoto : string,
  text : string,
  createdAt : Date,
  updatedAt : Date
}