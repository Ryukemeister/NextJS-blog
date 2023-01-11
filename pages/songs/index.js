import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Songs({ songs }) {
  return (
    <>
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

export default Songs;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/songs");
  const data = await response.json();

  return {
    props: {
      songs: data,
    },
  };
}
