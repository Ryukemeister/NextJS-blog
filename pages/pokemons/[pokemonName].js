import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function DisplayPokemon({ pokemon }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <h1 className={inter.className}>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <h1 className={inter.className}>{pokemon.name}</h1>
      <br />
      <hr />
      <br />
      <h1 className={inter.className}>Abilities</h1>
      {pokemon.abilities.map((ability, count) => {
        return (
          <div key={count} className={inter.className}>
            <h2>
              {count + 1}. {ability.ability.name}
            </h2>
          </div>
        );
      })}
      <br />
      <hr />
      <br />
      <h1 className={inter.className}>Moves</h1>
      {pokemon.moves.map((move, count) => {
        return (
          <div key={count} className={inter.className}>
            <h2>
              {count + 1}. {move.move.name}
            </h2>
          </div>
        );
      })}
    </>
  );
}

export default DisplayPokemon;

export async function getStaticPaths() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const paths = data.results.map((pokemon) => {
    return {
      params: {
        pokemonName: `${pokemon.name}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
  );
  const data = await response.json();

  return {
    props: {
      pokemon: data,
    },
  };
}
