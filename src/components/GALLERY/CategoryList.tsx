import Category from "../Buttons/Category";

const CategoryList = () => {
  return (
    <>
      <Category 
        title="อีเวนท์เซิฟเวอร์"
        description="กิจกรรมต่างๆ ในเซิฟเวอร์"
        to="/gallery/news"
      />
      <Category 
        title="หมวดหมู่ทั่วไป"
        description="ผู้เล่นทุกคนสามารถลงรูปภาพได้"
        to="/gallery/general"
      />
    </>
  );
};

export default CategoryList;
