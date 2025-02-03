import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";
import { ModeToggle } from "./ModeToggleButton";

const NavbarLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  return (
    <header className="flex justify-center w-full h-[15vh]">
      <nav className="fixed top-8 w-4/5 sm:w-3/5 container bg-white dark:bg-black border border-black dark:border-white px-5 sm:pl-10 sm:pr-2 py-1 sm:py-2 rounded-full flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" aria-label="Homepage" title="Hey Sainty - Home">
          <span className="text-md sm:text-lg font-semibold">Hey Sainty</span>
        </Link>

        {/* Navigation Menu for large screen */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center justify-between gap-7">
            {NavbarLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href}>
                  {/* <NavigationMenuLink className="text-md rounded-md cursor-pointer"> */}
                    {link.label}
                  {/* </NavigationMenuLink> */}
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Account Dropdown */}
            {/* <NavigationMenuItem>
              <Button className="text-md rounded-full px-5 py-2">
                Get In <RxEnter />
              </Button>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-between gap-3">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <RxHamburgerMenu />
            </SheetTrigger>
            <SheetContent
              side={"right"}
              className="flex flex-col w-4/5 justify-start items-center gap-10 pt-24"
            >
              <SheetTitle className="text-2xl">Hey Sainty</SheetTitle>
              <SheetDescription>
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col items-center justify-evenly gap-3">
                    {NavbarLinks.map((link) => (
                      <NavigationMenuItem key={link.href}>
                        <Link href={link.href} legacyBehavior passHref>
                          <NavigationMenuLink className="text-lg rounded-md cursor-pointer">
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}

                    {/* <NavigationMenuItem>
                      <Button className="text-md rounded-full px-5 py-2">
                        Get In <RxEnter />
                      </Button>
                    </NavigationMenuItem> */}
                  </NavigationMenuList>
                </NavigationMenu>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
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
