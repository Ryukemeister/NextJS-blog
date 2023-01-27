import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function Personalities() {
  const [personalitiesData, setPersonalitiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPersonalitiesData() {
      const response = await fetch("http://localhost:4000/personalities");
      const data = await response.json();

      setPersonalitiesData(data);
      setIsLoading(false);
    }

    getPersonalitiesData();
  }, []);

  if (isLoading) return <h1 className={inter.className}>Loading...</h1>;

  return (
    <>
      <h1 className={inter.className}>Personalities</h1>
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

export default Personalities;
