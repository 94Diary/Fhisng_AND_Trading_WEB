import { useAppContext } from "../../context/AppContext";
import GalleryCard from "./GalleryCard";

const ContentAdmin = () => {
  const { user, galleryPosts, editGalleryPost, deleteGalleryPost } = useAppContext();
  if (!user) return <p>Loading...</p>;

  const newsPosts = galleryPosts.filter((p) => p.category === "news");

  return (
    <div className="flex flex-col w-full gap-6">
      {newsPosts.map((post) => (
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

export default ContentAdmin;
