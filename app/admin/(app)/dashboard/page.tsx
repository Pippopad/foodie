import { options } from "@/app/api/auth/[...nextauth]/options";
import BarChart from "@/components/BarChart";
import Header from "@/components/Header";
import RecentOrders from "@/components/RecentOrders";
import TopCards from "@/components/TopCards";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session: any = await getServerSession(options);
  if (!session) {
    redirect("/admin");
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
