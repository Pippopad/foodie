import { options } from "@/app/api/auth/[...nextauth]/options";
import BarChart from "@/components/dashboard/BarChart";
import Header from "@/components/Header";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopCards from "@/components/dashboard/TopCards";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session: any = await getServerSession(options);
  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Dashboard" username={session.user.username} />
      <TopCards />
      <div className="p-4 grid md:grid-cols-3 gap-4">
        <BarChart />
        <RecentOrders />
      </div>
    </main>
  );
};

export default Page;
