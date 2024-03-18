/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import BreadCrumb from "@/components/breadcrumb";
import UserTable from "@/components/tables/user-tables";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {
  const router = useRouter();

  const nextPage = () => {
    router.push("/dashboard/user/add-user");
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <Button onClick={nextPage} variant={"outline"}>
          <Plus className="mr-2" />
          Add
        </Button>
      </div>

      <UserTable />
    </>
  );
}
