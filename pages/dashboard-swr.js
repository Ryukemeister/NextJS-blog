import { Inter } from "@next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async function () {
  const response = await fetch("http://localhost:4000/dashboard");
  const data = await response.json();

  return data;
};

function DashboardSWR() {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error) return <div className={inter.className}> Failed to load </div>;
  if (!data) return <div className={inter.className}>Loading...</div>;

  return (
    <>
      <h1 className={inter.className}>Dashboard:</h1>
      <h1 className={inter.className}>
        Posts - {data.posts} | Likes - {data.likes}
      </h1>
      <h2 className={inter.className}>
        Followers - {data.followers} | Following - {data.following}
      </h2>
    </>
  );
}

export default DashboardSWR;
