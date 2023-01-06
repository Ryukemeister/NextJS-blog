import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function ArticleListByCategory({ articles, category }) {
  return (
    <>
      <h1 className={inter.className}>
        Showing articles for {category} category.
      </h1>
      {articles.map((article) => {
        return (
          <div key={article.id} className={inter.className}>
            <h1>
              {article.id} | {article.title}
            </h1>
            <h2>{article.description}</h2>
            <br />
            <hr />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `http://localhost:4000/news?category=${params.category}`
  );
  const data = await response.json();

  if (data.length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articles: data,
      category: params.category,
    },
  };
}
