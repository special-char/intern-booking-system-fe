"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Logo } from "@/icons/logo";

interface User {
  name: string;
  email: string;
  storeId: string;
  avatarUrl?: string;
}

// Example user data - in a real app this would come from your auth system
const user: User = {
  name: "Kal Gohil",
  email: "kal.gohil@gmail.com",
  storeId: "25685652",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Header() {
  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-indigo-950">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-9 max-w-screen-2xl mx-auto">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="icon" className="rounded-xl">
            <Bell className="h-5 w-5 " />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="User avatar"
                      width={36}
                      height={36}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-4">
                  <p className="text-xs font-medium leading-none text-muted-foreground">
                    USER
                  </p>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-col items-start">
                  <p className="text-xs font-medium leading-none text-muted-foreground">
                    EMAIL
                  </p>
                  <p className="mt-1 text-sm">{user.email}</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start">
                  <p className="text-xs font-medium leading-none text-muted-foreground">
                    STORE ID
                  </p>
                  <p className="mt-1 text-sm">{user.storeId}</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-between">
                Logout
                <span className="text-lg">→</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
