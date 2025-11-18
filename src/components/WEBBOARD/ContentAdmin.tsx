import { useAppContext } from "../../context/AppContext";
import PostCard from "./PostCard";

const ContentAdmin = () => {
  const { user, posts, editPost, deletePost } = useAppContext();

  if (!user) return <p>Loading...</p>;

  // filter เฉพาะหมวด news
  const newsPosts = posts.filter((p) => p.category === "news");

  return (
    <div className="flex flex-col w-full gap-6">
      {newsPosts.map((post) => (
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

export default ContentAdmin;
