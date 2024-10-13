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
import {
  GithubIcon,
} from "@/src/components/icons";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, } from "@nextui-org/react";
import { useUser } from "../context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../services/AuthServices";
import { protectedRoutes } from "../constant";
import { useGetUser } from "../hooks/auth.hook";

export const Navbar = () => {

  const router = useRouter();
  const { user } = useUser()
  const { data } = useGetUser()
  const pathname = usePathname();

  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };


  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img alt="" src="https://i.ibb.co.com/BKKK5Lq/Logo-2.png" />
          </NextLink>
        </NavbarBrand>
        < motion.ul className="hidden lg:flex gap-4 justify-start ml-2">
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
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem>
          <form >
            <div>

              <div className="">
                <div className=" w-full max-w-md">
                  <Input
                    aria-label="Search"
                    className=" pl-10  pr-4 py-2 rounded-sm"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>

            </div>
          </form>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
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
              src={data?.data?.profilePhoto}
            />
          </DropdownTrigger>
          <DropdownMenu variant="bordered">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold text-red-600">{user?.email}</p>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/profile')} >profile</DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/contact')} >Contact</DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/about')} >About</DropdownItem>
            {
              data?.data?.role === "ADMIN" ? <DropdownItem onClick={() => handleNavigation('/adminDashboard')}>Dashboard</DropdownItem> : <DropdownItem onClick={() => handleNavigation('/userDashboard')}>Dashboard</DropdownItem>
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
