import { Inter } from "@next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

async function fetcher() {
  const response = await fetch("http://localhost:4000/dashboard");
  const data = await response.json();

  return data;
}

function DashboardSWR() {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error)
    return <h1 className={inter.className}>Oops, an error has occured</h1>;
  if (!data) return <h1 className={inter.className}>Loading...</h1>;

  return (
    <>
      <h1 className={inter.className}>Posts | {data.posts}</h1>
      <h1 className={inter.className}>Likes | {data.likes}</h1>
      <h1 className={inter.className}>Followers | {data.followers}</h1>
      <h1 className={inter.className}>Following | {data.following}</h1>
    </>
  );
}

export default DashboardSWR;
