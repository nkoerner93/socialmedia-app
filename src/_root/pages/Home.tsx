import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError } = useGetRecentPosts();
  const test = false;

  return (
    <div>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:52-bold text-left w-full">Home Feed</h2>
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul>
                {posts?.documents.map((post) => (
                  <li key={post.$id} className="whitespace-wrap">
                    {post.imageUrl}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
