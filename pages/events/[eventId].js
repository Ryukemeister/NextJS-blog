import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function Event({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <br />
        <h1 className={inter.className}>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <br />
      <h1 className={inter.className}>
        {event.title} | {event.artist}
      </h1>
    </>
  );
}

export default Event;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/events");
  const data = await res.json();
  const paths = data.slice(0, 3).map((event) => {
    return {
      params: {
        eventId: `${event.id}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:4000/events/${params.eventId}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: data,
    },
    revalidate: 30,
  };
}
