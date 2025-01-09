import photo1 from "../images/photos/img1.png";
import photo2 from "../images/photos/img2.png";
import photo3 from "../images/photos/img3.png";

export default function Home() {
  return (
    <>
      {/* <Breadcrumb pageName="Home" /> */}
      <div className="overflow-hidden rounded-sm shadow-default">
        <div className="flex flex-wrap px-4 py-6 gap-4">
          <div className="md:w-9/12 lg:w-6/12">
            <div className="text-5xl mb-5 relative z-10">
              <span className="font-bold">Ram</span>
              <span className="font-thin">
                Serv, Your Tech Partner For Digital Products, Experience &
                Transformation.{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full h-auto gap-x-4">
          <div className="flex-[1] flex items-end justify-center px-5">
            <img src={photo2} alt="photo two" />
          </div>

          {/* <div className="flex-[0.3] flex items-end justify-center ">
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                scrollToFooter();
              }}
              className="transform rotate-90 hover:text-orange-500 cursor-pointer"
            >
              <p>SCROLL</p>
            </a>
          </div> */}

          <div className="relative flex-[2.5] flex items-start justify-center">
            <div className="relative w-full h-full">
              <img src={photo1} alt="photo one" />
              {/* <ParallaxBanner
                layers={[{ image: photo1, speed: -15 }]}
                className="aspect-[2/1]"
              /> */}
            </div>
          </div>

          <div className="flex-[1] flex items-start justify-center px-5">
            <img src={photo3} alt="photo three" />
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex-1 flex items-center justify-center px-5">
            <div className="container max-w-3xl mt-6 text-center">
              <p className="text-2xl leading-tight">
                There are many variations of passages of Lorem Ipsum available,
                but the majority
              </p>
              <p className="mt-4">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour,
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
