import { Inter } from "@next/font/google";
import { useState } from "react";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async function ({ personalities }) {
  const response = await fetch("http://localhost:4000/personalities");
  const data = await response.json();

  return data;
};

function PersonalitiesSWR({ personalities }) {
  const [personalitiesData, setPersonalitiesData] = useState(personalities);
  // const { data, error } = useSWR("personalities", fetcher);

  // if (error)
  //  return <h1 className={inter.className}>Oops, an error has occured</h1>;
  // if (!data) return <h1 className={inter.className}>Loading...</h1>;

  async function getPersonalitiesData() {
    const response = await fetch(
      "http://localhost:4000/personalities?category=sports"
    );
    const data = await response.json();

    setPersonalitiesData(data);
  }

  return (
    <>
      <button onClick={getPersonalitiesData}>Sports category</button>
      <h1 className={inter.className}>PersonalitiesSWR</h1>
      <br />
      <hr />
      <br />
      {personalitiesData.map((personality) => {
        return (
          <div key={personality.id} className={inter.className}>
            <h1>
              {personality.id}. {personality.title} - {personality.age} |{" "}
              {personality.category}
            </h1>
            <h2>{personality.description}</h2>
            <br />
            <hr />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default PersonalitiesSWR;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/personalities?");
  const data = await response.json();

  return {
    props: {
      personalities: data,
    },
  };
}
