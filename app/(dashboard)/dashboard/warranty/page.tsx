"use client";

import BreadCrumb from "@/components/breadcrumb";
import WarrantyTable from "@/components/tables/warranty";

const breadcrumbItems = [{ title: "Warranty", link: "/dashboard/warranty" }];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <WarrantyTable />
    </>
  );
}
