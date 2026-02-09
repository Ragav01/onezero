import CategoryList from "@/components/categoryList";
import PostList from "@/components/postList";
import SliderList from "@/components/sliderList";




export default function Home() {
  return (
    <div className="main">
      <SliderList/>
      <CategoryList/>
      <PostList/>
    </div>
  );
}
