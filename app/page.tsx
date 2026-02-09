// import Image from "next/image";

import CategoryList from "@/components/categoryList";
import CoruselBanner from "@/components/coruselBanner";
import PostList from "@/components/postList";
import SliderList from "@/components/sliderList";

// import Categories from "./categories/page";



export default function Home() {
  return (
    <div className="main">
      {/* <CoruselBanner/> */}
      <SliderList/>
      <CategoryList/>
      <PostList/>
    </div>
  );
}
