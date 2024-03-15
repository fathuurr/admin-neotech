import BreadCrumb from "@/components/breadcrumb";
import UpdateForm from "@/components/forms/update-auth-form";
import UpdatePassword from "@/components/forms/update-password";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/settings" }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title={"Settings"} description="Update your profile here" />
      </div>

      <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UpdateForm />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatePassword />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
