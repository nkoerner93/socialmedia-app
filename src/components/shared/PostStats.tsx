import { Models } from "appwrite";
import { useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const [liked, setLiked] = useState(false);

  const handleLikePost = () => {
    setLiked(true);
  };

  const handleisLikePost = () => {
    setLiked(false);
  };

  return (
    <div className="cursor-pointer">
      {liked ? (
        <img
          src="/assets/icons/liked.svg"
          alt="liked"
          className="w-6 h-6"
          onClick={handleisLikePost}
        />
      ) : (
        <img
          src="/assets/icons/like.svg"
          alt="like"
          className="w-6 h-6"
          onClick={handleLikePost}
        />
      )}
    </div>
  );
};

export default PostStats;
