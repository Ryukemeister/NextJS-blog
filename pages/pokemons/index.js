import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Pokemons({ pokemons }) {
  return (
    <>
      <h1 className={inter.className}>Welcome to the Pokemons page</h1>
      {pokemons.map((pokemon, count) => {
        return (
          <div key={count}>
            <h1 className={inter.className}>
              {count + 1}. {pokemon.name}
            </h1>
          </div>
        );
      })}
    </>
  );
}

export default Pokemons;

export async function getStaticProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();

  return {
    props: {
      pokemons: data.results,
    },
  };
}
