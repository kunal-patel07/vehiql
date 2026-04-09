import { getAdmin } from "@/actions/admin";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import Sidebar from "./_components/sidebar";
import AdminClientWrapper from "./_components/admin-client-wrapper";

const AdminLayout = async ({children}) => {

    const admin = await getAdmin();
    if(!admin.authorized){
        return notFound();
    }
  return <div className="h-full">
    <Header isAdminPage={true}/>

    <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50 ">
        <Sidebar />
    </div>
    <main className="md:pl-56 pt-[80px] h-full ">
      <AdminClientWrapper>
        {children}
      </AdminClientWrapper>
    </main>
  </div>;
};

export default AdminLayout;
