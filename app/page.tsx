import BarChart from "@/components/BarChart";
import Header from "@/components/Header";
import RecentOrders from "@/components/RecentOrders";
import TopCards from "@/components/TopCards";

function Dashboard() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <TopCards />
      <div className="p-4 grid md:grid-cols-3 gap-4">
        <BarChart />
        <RecentOrders />
      </div>
    </main>
  );
}

export default Dashboard;
