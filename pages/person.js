import { Inter } from "@next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Person({ personalities }) {
  const [personalitiesData, setPersonalitiesData] = useState(personalities);

  async function getPersonalityCategory(category) {
    let data;

    if (category == "") {
      const response = await fetch(
        `http://localhost:4000/personalities?${category}`
      );
      data = await response.json();
    } else {
      const response = await fetch(
        `http://localhost:4000/personalities?category=${category}`
      );
      data = await response.json();
    }

    setPersonalitiesData(data);
  }

  return (
    <>
      <h1 className={inter.className}>Person</h1>
      <button onClick={() => getPersonalityCategory("sports")}>Sports</button>
      <button onClick={() => getPersonalityCategory("music")}>Music</button>
      <button onClick={() => getPersonalityCategory("movies")}>Movies</button>
      <button onClick={() => getPersonalityCategory("")}>All</button>
      <br />
      {personalitiesData.map((person, count) => {
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

export default Person;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/personalities");
  const data = await response.json();

  return {
    props: {
      personalities: data,
    },
  };
}
