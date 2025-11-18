import { useAppContext } from "../../context/AppContext";
import GalleryCard from "./GalleryCard";

const ContentUser = () => {
  const { user, galleryPosts, editGalleryPost, deleteGalleryPost } = useAppContext();
  if (!user) return <p>Loading...</p>;

  const generalPosts = galleryPosts.filter((p) => p.category === "general");

  return (
    <div className="flex flex-col w-full gap-6">
      {generalPosts.map((post) => (
        <GalleryCard
          key={post.id}
          post={post}
          currentUser={user}
          onDelete={deleteGalleryPost}
          onUpdate={editGalleryPost}
        />
      ))}
    </div>
  );
};

export default ContentUser;
