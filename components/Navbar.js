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
import { UserAccount } from "./UserAccount";

const NavbarLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/page/about" },
  { label: "Project", href: "/project" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  return (
    <header className="flex justify-center w-full h-[15vh] items-center">
      <nav
        role="navigation"
        aria-label="Primary Navigation"
        className="fixed top-8 w-4/5 sm:w-3/5 container bg-background/80 border border-muted-foreground/80 px-5 sm:pl-10 sm:pr-2 py-1 sm:py-2 rounded-full flex justify-between items-center z-10"
      >
        {/* Logo / Brand */}
        <Link href="/" aria-label="Homepage" title="Hey Sainty - Home">
          <span className="text-md sm:text-lg font-semibold">Hey Sainty</span>
        </Link>

        {/* Navigation Menu for large screen */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center justify-between gap-7">
            {NavbarLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} passHref>
                  <NavigationMenuLink
                    title={link.label}
                    className="text-md rounded-md cursor-pointer"
                    aria-label={link.label}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side buttons */}
        <div className="flex items-center justify-between gap-1">
          <UserAccount />
          <ModeToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden" aria-label="Open menu">
              <button
                type="button"
                aria-label="Toggle mobile menu"
                title="Menu"
              >
                <RxHamburgerMenu />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col w-4/5 justify-start items-center gap-10 pt-24"
            >
              <SheetTitle className="text-2xl" aria-label="Hey Sainty">
                Hey Sainty
              </SheetTitle>
              <SheetDescription>
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col items-center justify-evenly gap-3">
                    {NavbarLinks.map((link) => (
                      <NavigationMenuItem key={link.href}>
                        <Link href={link.href} passHref>
                          <NavigationMenuLink
                            title={link.label}
                            className="text-lg rounded-md cursor-pointer"
                            aria-label={link.label}
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
