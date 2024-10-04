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

export interface TUser {
  _id: string,
  name: string,
  email: string,
  password: string,
  mobileNumber: string,
  profilePhoto: string,
  coverPhoto : string,
  intro : string,
  college : string,
  university : string,
  lives : string,
  from : string
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  address: string,
  createdAt: Date,
  updatedAt: Date,
  role: 'ADMIN' | 'USER',
  followers: Array<{
      id: string;
      email: string;
      username: string;
      profilePhoto : string
  }>;
  following: Array<{
      id: string;
      email: string;
      username: string;
      profilePhoto : string
  }>;
};

export type TPost = {
  userName: string,
  userId: string,
  userProfilePhoto: string,
  userEmail: string,
  caption: string,
  isPremium : boolean,
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