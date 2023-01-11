import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Shows({ shows }) {
  return (
    <>
      <h1 className={inter.className}>All shows for the calender year 2023</h1>
      <br />
      {shows.map((show) => {
        return (
          <div key={show.id} className={inter.className}>
            <h1>
              {show.id}. {show.title} - {show.location} | {show.artist}
            </h1>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Shows;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/events");
  const data = await res.json();

  return {
    props: {
      shows: data,
    },
  };
}
