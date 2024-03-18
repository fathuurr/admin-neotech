/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import BreadCrumb from "@/components/breadcrumb";
import WarrantyTable from "@/components/tables/warranty";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const breadcrumbItems = [{ title: "Warranty", link: "/dashboard/warranty" }];

export default function page() {
  const router = useRouter();

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
      </div>

      <WarrantyTable />
    </>
  );
}
