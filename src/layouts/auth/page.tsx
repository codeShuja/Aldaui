import { Outlet } from "react-router-dom";
import Carousel from "../../components/Carousel";

function Page() {
  const images = [
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1735334280/kghyt5c5azegenudn2ca.jpg',
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1735334277/clu5ejwqnysmavybuswk.jpg',
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1735334279/qliparcx5rzbt13bffzu.jpg',
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1735334279/gov1esel7quhab19adfv.jpg',
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 relative md:block overflow-hidden">
        <Carousel images={images} />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Page;
