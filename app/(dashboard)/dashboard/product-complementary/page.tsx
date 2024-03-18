"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import BreadCrumb from "@/components/breadcrumb";
import { ModalAddComplementary } from "@/components/modal/product-complementary/ModalAddComplementary";
import ProductComplementaryTable from "@/components/tables/product-complementary-table";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const breadcrumbItems = [
  { title: "Product Complementary", link: "/dashboard/product-complementary" },
];
const page = () => {
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

        <div className="flex items-start justify-between">
          <ModalAddComplementary />
        </div>

        <ProductComplementaryTable />

        {/* 
      <EmployeeTable
        searchKey="country"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={employee}
        pageCount={pageCount}
      /> */}
      </div>
    </>
  );
};

export default page;
