import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function NewsArticleList({ articles }) {
  console.log(articles);

  return (
    <>
      <h1 className={inter.className}>List of news articles</h1>
      <br />
      <hr />
      {articles.map((article) => {
        return (
          <div key={article.id} className={inter.className}>
            <h1>{article.title}</h1>
            <h2>{article.description}</h2>
            <h3>{article.category}</h3>
            <br />
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default NewsArticleList;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();

  return {
    props: {
      articles: data,
    },
  };
}
