import { useAppContext } from "../../context/AppContext";
import GalleryCard from "./GalleryCard";

const ContentUser = () => {
  const { user, galleryPosts, deleteGalleryPost } = useAppContext();
  if (!user) return <p>Loading...</p>;

  const generalPosts = galleryPosts.filter((p) => p.category === "general");

  return (
    <div className="flex flex-col w-full gap-6">
      {generalPosts.map((post) => (
        <GalleryCard
          key={post.id}
          post={post}
          currentUser={user}
          onDelete={deleteGalleryPost} //  ไม่ส่ง onUpdate แล้ว
        />
      ))}
    </div>
  );
};

export default ContentUser;
