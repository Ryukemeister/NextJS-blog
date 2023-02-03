import { Inter } from "@next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async function () {
  const response = await fetch("http://localhost:4000/personalities");
  const data = await response.json();

  return data;
};

function Personality() {
  const { data, error } = useSWR("personality", fetcher);
  console.log(data);

  if (!data) return <h1 className={inter.className}>Loading...</h1>;

  return (
    <>
      {data.map((person, count) => {
        return (
          <div className={inter.className} key={person.id}>
            <h1>
              {count + 1}. {person.title} | {person.description}
            </h1>
          </div>
        );
      })}
    </>
  );
}

export default Personality;
