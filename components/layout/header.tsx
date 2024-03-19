/* eslint-disable no-console */
"use client";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";

import { MobileSidebar } from "./mobile-sidebar";
import Link from "next/link";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const { namaLengkap } = decodedToken;
        setNamaLengkap(namaLengkap);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm"> {namaLengkap} </span>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
