import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Events({ events }) {
  return (
    <>
      <h1 className={inter.className}>Events for the calender year 2023</h1>
      <br />
      {events.map((event) => {
        return (
          <div key={event.id} className={inter.className}>
            <h1>
              {event.id}. {event.title} - {event.location} | {event.artist}
            </h1>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Events;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/events");
  const data = await res.json();

  return {
    props: {
      events: data,
    },
    revalidate: 30,
  };
}
