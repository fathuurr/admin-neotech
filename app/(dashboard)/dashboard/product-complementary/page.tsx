import BreadCrumb from "@/components/breadcrumb";
import { ModalAddComplementary } from "@/components/modal/product-complementary/ModalAddComplementary";
import ProductComplementaryTable from "@/components/tables/product-complementary-table";

const breadcrumbItems = [
  { title: "Product Complementary", link: "/dashboard/product-complementary" },
];
const page = () => {
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
