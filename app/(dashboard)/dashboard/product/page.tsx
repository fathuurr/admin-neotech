import BreadCrumb from "@/components/breadcrumb";
import { ModalAddProduct } from "@/components/modal/product/ModalAddProduct";
import ProductTable from "@/components/tables/product-tables";

const breadcrumbItems = [{ title: "Product", link: "/dashboard/product" }];
const page = () => {
  return (
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
  );
};

export default page;
