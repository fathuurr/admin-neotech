import BreadCrumb from "@/components/breadcrumb";
import { ModalAddCategory } from "@/components/modal/product-category/ModalAddCategory";
import ProductCategoryTable from "@/components/tables/product-category-tables";

const breadcrumbItems = [
  { title: "Product Category", link: "/dashboard/product-category" },
];
const page = () => {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <ModalAddCategory />
        </div>

        <ProductCategoryTable />

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
