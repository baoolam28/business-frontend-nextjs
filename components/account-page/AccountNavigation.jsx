
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, CreditCard, Heart, Lock } from 'lucide-react';

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const accountLinks = [
  {
    title: "My Profile",
    href: "/account",
    icon: User,
  },
  {
    title: "Change Password",
    href: "/changes-pass",
    icon: Lock,
    isDisabled: true,
  },
  {
    title: "Payment Options",
    href: "/payment",
    icon: CreditCard,
    isDisabled: true,
  },
];

const orderLinks = [
  {
    title: "My Orders",
    href: "/orderstatus",
    icon: Package,
  },
];

const AccountNavigation = () => {
  const pathname = usePathname();

  return (
    <Card className="h-[calc(100vh-96px)] w-full md:w-[280px]">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account settings and view orders</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="flex flex-col space-y-6">
            <nav className="flex flex-col space-y-1">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Manage My Account</h2>
              {accountLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === link.href ? "bg-muted" : "hover:bg-muted",
                    link.isDisabled && "pointer-events-none opacity-60"
                  )}
                  asChild
                >
                  <Link href={link.isDisabled ? "#" : link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Link>
                </Button>
              ))}
            </nav>
            <nav className="flex flex-col space-y-1">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">My Orders</h2>
              {orderLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === link.href ? "bg-muted" : "hover:bg-muted",
                    link.isDisabled && "pointer-events-none opacity-60"
                  )}
                  asChild
                >
                  <Link href={link.isDisabled ? "#" : link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Link>
                </Button>
              ))}
            </nav>
            <nav className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start opacity-60 hover:opacity-100"
                asChild
              >
                <Link href="#">
                  <Heart className="mr-2 h-4 w-4" />
                  My Wishlist
                </Link>
              </Button>
            </nav>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default AccountNavigation;
