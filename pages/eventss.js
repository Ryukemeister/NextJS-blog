import { Inter } from "@next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Events({ eventList }) {
  const [events, setEvents] = useState(eventList);

  async function getSportEvents() {
    const response = await fetch("http://localhost:4000/event?category=sports");
    const data = await response.json();

    setEvents(data);
  }

  async function getEventsBasedOnCategory(category) {
    let data;

    if (category == "") {
      const response = await fetch("http://localhost:4000/event");
      data = await response.json();
    } else {
      const response = await fetch(
        `http://localhost:4000/event?category=${category}`
      );
      data = await response.json();
    }

    setEvents(data);
  }

  return (
    <>
      <h1 className={inter.className}>List of events</h1>
      <button onClick={getSportEvents}>Sports</button>
      <br />
      <hr />
      {events.map((event) => {
        return (
          <div key={event.id} className={inter.className}>
            <br />
            <h1>
              {event.id}. {event.title} {event.date} | {event.category}
            </h1>
            <h2>{event.description}</h2>
            <br />
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default Events;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/event");
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
