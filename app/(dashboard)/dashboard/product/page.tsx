/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ModalAddProduct } from "@/components/modal/product/ModalAddProduct";
import ProductTable from "@/components/tables/product-tables";
import ProductIsDeleted from "@/components/tables/product-tables/productIsDeleted";
import { useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";
import { useEffect } from "react";

const breadcrumbItems = [{ title: "Product", link: "/dashboard/product" }];
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const myParam = searchParams.get("isDeleted");

  const isParamPresent = myParam !== null;

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {!isParamPresent && (
        <>
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between">
              <ModalAddProduct />
            </div>

            {/* <Separator />

      <EmployeeTable
        searchKey="country"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={employee}
        pageCount={pageCount}
      /> */}

            <ProductTable />
          </div>
        </>
      )}

      {isParamPresent && (
        <div className="mt-10">
          <ProductIsDeleted />
        </div>
      )}
    </>
  );
};

export default page;
