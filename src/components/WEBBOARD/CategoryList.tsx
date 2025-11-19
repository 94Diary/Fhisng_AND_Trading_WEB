import Category from "../Buttons/Category";

const CategoryList = () => {
  return (
    <>
      <Category 
        title="หมวดหมู่ข่าวสาร"
        description="อัพเดทข่าวสารต่างๆ ที่น่าสนใจ"
        to="/webboard/news"
      />
      <Category
        title="หมวดหมู่ทั่วไป"
        description="พูดคุยเรื่องทั่วไปที่ไม่เข้าพวก"
        to="/webboard/general"
      />
    </>
  );
};

export default CategoryList;
