import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxEnter } from "react-icons/rx";

import Link from "next/link";
import { Button } from "./ui/button";

const NavbarLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

const Pages = [
  {
    label: "About",
    href: "/about",
    description: "Learn more about Hey Sainty",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Reach out for inquiries",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
    description: "Read our website disclaimer",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    description: "Understand our privacy policy",
  },
  {
    label: "GDPR Compliance",
    href: "/gdpr-compliance",
    description: "Check our GDPR compliance",
  },
];

const Navbar = ({ user }) => {
  const AccountOptions = user
    ? [
        {
          label: "Manage Profile",
          href: "/profile",
          description: "Go to your profile",
        },
        {
          label: "Sign Out",
          href: "/logout",
          description: "Log out from your account",
        },
      ]
    : [
        {
          label: "Sign In",
          href: "/login",
          description: "Already have an account? Sign in",
        },
        {
          label: "Sign Up",
          href: "/register",
          description: "New here? Create an account",
        },
      ];

  return (
    <header className="flex justify-center w-full">
      <nav className="fixed top-8 w-4/5 sm:w-3/5 container border border-slate-400 px-5 sm:pl-10 sm:pr-2 py-2 rounded-full flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" aria-label="Homepage" title="Hey Sainty - Home">
          <span className="text-md sm:text-lg font-semibold">Hey Sainty</span>
        </Link>

        {/* Navigation Menu for large screen */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center justify-between gap-7">
            {NavbarLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className="text-md rounded-md cursor-pointer transition-all duration-500">
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Account Dropdown */}
            <NavigationMenuItem>
              <Button className="text-md rounded-full px-5 py-2">
                Hop In <RxEnter />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet key={"left"}>
          <SheetTrigger asChild className="lg:hidden">
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="flex flex-col justify-start items-center gap-10 pt-24"
          >
            <SheetTitle className="text-2xl">Hey Sainty</SheetTitle>
            <SheetDescription>
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col items-center justify-evenly gap-2">
                  {NavbarLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} text-xl rounded-md cursor-pointer`}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;

{
  /* Pages Dropdown */
}
{
  /* <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[16px]">
                Pages
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-2 gap-4 p-8 lg:w-[600px] h-auto">
                  {Pages.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href} title={page.label}>
                        <Button
                          variant="secondary"
                          className="flex flex-col items-start p-3 rounded-lg h-auto w-[250px]"
                        >
                          <p className="font-semibold text-lg">{page.label}</p>
                          <p className="text-sm">{page.description}</p>
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */
}
