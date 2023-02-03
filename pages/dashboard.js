import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDashboardData() {
      const response = await fetch("http://localhost:4000/dashboard");
      const data = await response.json();

      setDashboardData(data);
      setIsLoading(false);
    }

    getDashboardData();
  }, []);

  if (isLoading) return <h1 className={inter.className}>Loading...</h1>;

  return (
    <>
      <h1 className={inter.className}>Posts - {dashboardData.posts}</h1>
      <h1 className={inter.className}>Likes - {dashboardData.likes}</h1>
      <h1 className={inter.className}>Followers - {dashboardData.followers}</h1>
      <h1 className={inter.className}>Following - {dashboardData.likes}</h1>
    </>
  );
}

export default Dashboard;
