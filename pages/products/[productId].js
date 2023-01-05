import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <h1 className={inter.className}>Loading...</h1>
      </>
    );
  }

  console.log(product);

  return (
    <>
      <h1>{product.title}</h1>
      <h2>{product.price}</h2>
      <h3>{product.description}</h3>
    </>
  );
}

export default Product;

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          productId: "1",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();

  console.log("Regenarting our single product once again");

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}
