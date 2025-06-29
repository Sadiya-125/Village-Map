"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Building, Plus, MapIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { supabase } from "../../utils/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const [userInfo, setUserInfo] = useState();

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-50 bg-white">
      <div className="flex gap-4 items-center ml-4">
        <Link href={"/"} className="flex items-center gap-5">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <span className="hidden md:inline text-primary font-semibold text-lg">
            Reaching Roots
          </span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {isSignedIn && userInfo?.status === "Accepted" && (
          <Link href={"/add-new-listing"}>
            <Button className="gap-2 text-white hidden md:flex">
              <Plus className="h-5 w-5" /> Search Listings
            </Button>
            <Button className="text-white md:hidden p-2 h-10 w-10 justify-center">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        )}

        {isSignedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="User Logo"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 py-2 right-4 !translate-x-[-1rem] !translate-y-[0.5rem]">
              <DropdownMenuLabel className="text-sm font-semibold text-primary">
                <div className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5" /> Reaching Roots
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm py-2">
                <Link href="/user">Profile</Link>
              </DropdownMenuItem>
              {userInfo?.status === "Accepted" && (
                <DropdownMenuItem className="text-sm py-2">
                  <Link href="/my-listings">My Listings</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-sm py-2">
                <SignOutButton>Log Out</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
