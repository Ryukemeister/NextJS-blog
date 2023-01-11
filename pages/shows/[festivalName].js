import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Show({ shows, festival }) {
  return (
    <>
      <h1 className={inter.className}>
        Our 2023 lineup for {festival} is here:
      </h1>
      <br />
      {shows.map((show, count) => {
        return (
          <div key={show.id} className={inter.className}>
            <h1>
              {count + 1}. {show.location} | {show.artist}
            </h1>
          </div>
        );
      })}
    </>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch(
    `http://localhost:4000/events?title=${params.festivalName}`
  );
  const data = await res.json();

  if (data.length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shows: data,
      festival: params.festivalName,
    },
  };
}
