import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function getDashboardData() {
      const response = await fetch("http://localhost:4000/dashboard");
      const data = await response.json();

      setDashboardData(data);
      setIsLoading(false);
    }

    getDashboardData();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1 className={inter.className}>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <h1 className={inter.className}>Dashboard:</h1>
      <h1 className={inter.className}>
        Posts - {dashboardData.posts} | Likes - {dashboardData.likes}
      </h1>
      <h2 className={inter.className}>
        Followers - {dashboardData.followers} | Following -
        {dashboardData.following}
      </h2>
    </>
  );
}

export default Dashboard;
