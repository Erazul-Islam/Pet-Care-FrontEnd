/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */

"use client"

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";

import { } from "@nextui-org/navbar";

import { motion } from "framer-motion"

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, } from "@nextui-org/react";
import { useUser } from "../context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../services/AuthServices";
import { protectedRoutes } from "../constant";

export const Navbar = () => {

  const router = useRouter();
  const { user } = useUser()
  const pathname = usePathname();

  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    router.push('/')
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };


  return (
    <NextUINavbar style={{backgroundColor :"#081028"}} maxWidth="full" position="sticky">
      <NavbarContent>
        < motion.ul className="hidden lg:flex gap-12 justify-center items-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </motion.ul>
      </NavbarContent>
      {/* <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent> */}
      
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
      <NavbarContent className="items-center " justify="end">
        <Dropdown className="rounded-sm border border-white" placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user?.profilePhoto}
            />
          </DropdownTrigger>
          <DropdownMenu variant="bordered">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold text-red-600">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key={'profile'} onClick={() => handleNavigation('/profile')} >profile</DropdownItem>
            <DropdownItem key={'contact'} onClick={() => handleNavigation('/contact')} >Contact</DropdownItem>
            <DropdownItem key={'about'} onClick={() => handleNavigation('/about')} >About</DropdownItem>
            {
              user?.role === "ADMIN" ? <DropdownItem key={'adminDashboard'} onClick={() => handleNavigation('/adminDashboard')}>Dashboard</DropdownItem> : <DropdownItem key={'userDashboard'} onClick={() => handleNavigation('/userDashboard')}>Dashboard</DropdownItem>
            }
            <DropdownItem key="change">
              {user ? <Link href="/changePassword"><p className=" text-white">Change Password</p></Link> : ''}
            </DropdownItem>
            <DropdownItem key="logout" color="success">
              {user ? <Button className="rounded-sm text-white" color="warning" onClick={() => handleLogout()}>Log out</Button> : <Link href="/login"><Button color="success" className="rounded-sm text-white">Log in</Button></Link>}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextUINavbar>
  );
};
