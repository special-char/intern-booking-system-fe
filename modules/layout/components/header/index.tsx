import { Bell, LogOutIcon, MapPin } from "lucide-react";
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
import { logout } from "@/lib/data/admin";
import { getUser } from "@/lib/data/admin";
import { Media, Tenant } from "@/payload-types";

// Static venue data for demonstration
const venues = [
  { id: 1, name: "Venue A", location: "London" },
  { id: 2, name: "Venue B", location: "Manchester" },
  { id: 3, name: "Venue C", location: "Birmingham" },
  { id: 4, name: "Venue D", location: "Liverpool" },
];

interface User {
  name: string;
  email: string;
  storeId: string;
  avatarUrl?: string;
}

// Example user data - in a real app this would come from your auth system
// const user: User = {
//   name: "Kal Gohil",
//   email: "kal.gohil@gmail.com",
//   storeId: "25685652",
// };

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export async function Header() {
  const { user } = await getUser()
  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-indigo-950">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-9">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {/* Venue Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 rounded-xl">
                <MapPin className="h-4 w-4" />
                <span>Select Venue</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Your Venues</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {venues.map((venue) => (
                <DropdownMenuItem key={venue.id} className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">{venue.name}</span>
                    <span className="text-xs text-gray-500">{venue.location}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="rounded-xl">
            <Bell className="h-5 w-5 " />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  {user?.profilePhoto ? (
                    <Image
                      src={(user.profilePhoto as Media).url || ""}
                      alt="User avatar"
                      width={36}
                      height={36}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal py-2 px-3">
                <div className="flex flex-col space-y-2">
                  <p className="text-[10px] leading-none text-text-primary">
                    USER
                  </p>
                  <p className="text-sm font-medium leading-none text-text-primary">
                    {user?.name}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex flex-col items-start py-2 space-y-2 px-3">
                  <p className="text-[10px] leading-none text-text-primary">
                    EMAIL
                  </p>
                  <p className="text-sm font-medium leading-none text-text-primary">
                    {user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex flex-col items-start py-2 space-y-2 px-3">
                  <p className="text-[10px] leading-none text-text-primary">
                    STORE ID
                  </p>
                  <p className="text-sm font-medium leading-none text-text-primary">
                    {(user?.tenants?.[0]?.tenant as Tenant)?.id}
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="border-border-primary" />
              <DropdownMenuItem>
                <form action={logout}>
                  <button type="submit" className="flex items-center justify-between">
                    Logout
                    <LogOutIcon />
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}