import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Posts() {
  const [postsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("https://dummyjson.com/posts/");
      const data = await response.json();

      setPostsData(data.posts.slice(0, 10));
      setIsLoading(false);
    }

    getPosts();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1 className={inter.className}>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <h1 className={inter.className}>POSTS</h1>
      <br />
      {postsData.map((post, count) => {
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

export default Posts;
