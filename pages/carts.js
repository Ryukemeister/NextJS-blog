import { Inter } from "@next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async function () {
  const response = await fetch("https://dummyjson.com/carts");
  const data = response.json();

  return data;
};

function Carts() {
  const { data, error } = useSWR("carts", fetcher);

  if (error) {
    return (
      <div className={inter.className}>
        <h1>An error has been found</h1>
      </div>
    );
  }

  if (!data)
    return (
      <div className={inter.className}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      {data.carts.slice(0, 10).map((item, count) => {
        return (
          <div key={item.id} className={inter.className}>
            <h1>
              {count + 1} . Total price: {item.total}
            </h1>
            <br />
            {item.products.map((product) => {
              return (
                <div key={product.id}>
                  <h1>
                    Item - {product.title} | Price - ${product.price} | Quantity
                    - {product.quantity}
                  </h1>
                </div>
              );
            })}
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Carts;
