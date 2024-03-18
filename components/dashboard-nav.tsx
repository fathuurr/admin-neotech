"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { NavItem } from "@/types";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "./ui/separator";
import { LogOut } from "lucide-react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const router = useRouter();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  const onLogout = () => {
    Cookies.remove("accessToken", {
      path: "/",
      domain: "localhost",
    });
    router.push("/");
  };

  if (!items?.length || userRole === null) {
    return null;
  }

  const filteredItems = items.filter((item) => {
    if (item.title === "User" && userRole !== "superAdmin") {
      return false;
    }
    return true;
  });
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {filteredItems.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];

        const isSuperAdmin = userRole === "superAdmin";
        const isUserItemForAdmin = item.title === "Warranty" && !isSuperAdmin;

        return (
          item.href && (
            <>
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
              {(isUserItemForAdmin ||
                (item.title === "User" && isSuperAdmin)) && (
                <Separator className="mt-1 border" />
              )}
            </>
          )
        );
      })}

      <span
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </span>
    </nav>
  );
}
