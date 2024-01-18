import { getRecentPosts } from "@/lib/appwrite/api";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
  const posts = useGetRecentPosts();
  const data = posts.data;

  return (
    <div>
      {data?.documents.map((post) => (
        <div key={post.$id}>
          {/* Render post details here */}
          <p>Caption: {post.caption}</p>
          <img src={post.imageUrl} alt="Post Image" />
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Home;
