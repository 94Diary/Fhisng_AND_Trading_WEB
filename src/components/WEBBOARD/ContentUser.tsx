import { useAppContext } from "../../context/AppContext";
import PostCard from "./PostCard";

const ContentUser = () => {
  const { user, posts, editPost, deletePost } = useAppContext();

  if (!user) return <p>Loading...</p>;

  // filter เฉพาะหมวด general
  const generalPosts = posts.filter((p) => p.cegegory === "general");

  return (
    <div className="flex flex-col w-full gap-6">
      {generalPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={user}
          onDelete={deletePost}
          onUpdate={editPost}
          setPosts={() => {}}
        />
      ))}
    </div>
  );
};

export default ContentUser;
