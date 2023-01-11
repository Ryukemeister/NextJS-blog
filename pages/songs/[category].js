import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function DisplayCategories({ songs, category }) {
  return (
    <>
      <h1 className={inter.className}>Songs category: {category}</h1>
      <br />
      {songs.map((song) => {
        return (
          <div key={song.id} className={inter.className}>
            <h1>
              {song.song} | {song.artist}
            </h1>
            <h2>{song.category}</h2>
            <br />
            <hr />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default DisplayCategories;

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `http://localhost:4000/songs?category=${params.category}`
  );
  const data = await response.json();

  return {
    props: {
      category: params.category,
      songs: data,
    },
  };
}
