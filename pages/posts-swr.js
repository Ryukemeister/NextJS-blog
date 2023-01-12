import { Inter } from "@next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async function () {
  const response = await fetch("https://dummyjson.com/posts/");
  const data = await response.json();

  return data.posts.slice(0, 10);
};

function PostsSWR() {
  const { data, error } = useSWR("posts", fetcher);

  if (error) return <div className={inter.className}>Failed to load</div>;
  if (!data)
    return (
      <div className={inter.className}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <h1 className={inter.className}>POSTS</h1>
      <br />
      {data.map((post, count) => {
        return (
          <div key={post.id} className={inter.className}>
            <h1>
              {count + 1}. Title - {post.title}
            </h1>
          </div>
        );
      })}
    </>
  );
}

export default PostsSWR;
