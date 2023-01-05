import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Products({ products }) {
  console.log(products);

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.id} className={inter.className}>
            <h1>{product.title}</h1>
            <h2>{product.description}</h2>
            <h3>Price | ${product.price}</h3>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Products;

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  console.log("Regenarting Products page");

  return {
    props: {
      products: data,
    },
    revalidate: 15,
  };
}
