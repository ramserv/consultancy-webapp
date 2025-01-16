import cover2 from "../images/cover/digital-journey-enabler.svg";
import { Link } from "react-router";
import { SectionTitle } from "~/components/SectionTitle";
import { Benefits } from "~/components/Benefits";
import { benefitOne } from "~/utils/benefits";
import bgVideo01 from "../images/cover/bg-video-02-compressed.mp4";
import bgVideo02 from "../images/cover/bg-video-01-compressed.mp4";
import { scrollToElement } from "~/utils/scrollUtils";
import { MotionSection } from "~/components/FramerMotion";
import { useEffect, useState } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Test() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoStyle, setVideoStyle] = useState({
    position: "fixed",
    opacity: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const secondDiv = document.getElementById("secondDiv");
      const secondDivRect = secondDiv
        ? secondDiv.getBoundingClientRect()
        : { top: 0, bottom: 0 };
      const secondDivBottom = secondDivRect.bottom;

      const fadeOpacity = Math.max(
        0,
        (secondDivRect.top - 300) / window.innerHeight
      );

      if (secondDivBottom <= 0) {
        setVideoStyle({ position: "absolute", opacity: 0 });
      } else {
        setVideoStyle({ position: "fixed", opacity: fadeOpacity });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`top-12 h-screen w-full overflow-hidden transition-opacity duration-200 ease-out`}
        style={{
          position: videoStyle.position as "fixed" | "absolute",
          opacity: videoStyle.opacity,
        }}
      >
        <div
          className={`absolute inset-0 bg-gray-900 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
        ></div>
        <video
          autoPlay
          muted
          loop
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
          onCanPlayThrough={() => setIsVideoLoaded(true)}
        >
          <source src={bgVideo01} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative flex flex-col items-center justify-center h-full text-center text-white bg-black/50">
          <h1 className="text-5xl font-bold">
            <span className="font-bold">Ram</span>
            <span className="font-thin">Serv Consultancy</span>
          </h1>
          <p className="mt-4 text-lg">Your vision, Our committment.</p>
          <Link
            to="/contact-us"
            rel="noopener"
            className="mt-6 px-6 py-3 bg-ramserv rounded-lg hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>
      </div>
      <MotionSection>
        <div
          className="flex flex-wrap container px-8 py-3 mx-auto xl:px-0 h-5/6 mt-[100vh] dark:bg-boxdark-2 dark:text-bodydark"
          id="secondDiv"
        >
          <div className="flex items-center w-full">
            <div className="mb-8 mr-8 relative z-10">
              <div className="text-5xl">
                <span className="font-bold">Ram</span>
                <span className="font-thin">
                  Serv, Transforming Ideas into Digital Realities
                </span>
              </div>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                What sets us apart is our unwavering commitment to understanding
                your business from the inside out. We don't offer
                one-size-fits-all solutions. Instead, we take a personalized
                approach, carefully tailoring our strategies to meet your unique
                challenges and objectives. Whether it's streamlining operations,
                driving digital transformation, or developing strategic growth
                plans, Ramserv is your trusted partner in success. From planning
                to execution, we provide end-to-end solutions designed to propel
                your business forward.
              </p>

              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <Link
                  to="/contact-us"
                  rel="noopener"
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-ramserv rounded-md hover:bg-blue-600"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full"></div>
        </div>
      </MotionSection>
      <MotionSection>
        <div className="relative h-screen w-full overflow-hidden">
          <ParallaxBanner
            layers={[
              {
                children: (
                  <>
                    <div
                      className={`absolute inset-0 bg-gray-900 ${
                        isVideoLoaded ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-500`}
                    ></div>
                    <video
                      autoPlay
                      muted
                      loop
                      preload="auto"
                      crossOrigin="anonymous"
                      className="absolute inset-0 w-full h-full object-cover"
                      onCanPlayThrough={() => setIsVideoLoaded(true)}
                    >
                      <source src={bgVideo02} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                ),
                speed: -20,
              },
            ]}
            className="aspect-[2/1]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-center text-white bg-black/50">
              <h1 className="text-5xl font-bold">
                <span className="font-thin">
                  Committed to Your Success, Connecting Beyond Borders
                </span>
              </h1>
            </div>
          </ParallaxBanner>
        </div>
      </MotionSection>

      <MotionSection>
        <SectionTitle preTitle="Our Benefits" title="Why should you choose us?">
          At Ramsery, we deliver tailored solutions that address your unique
          business needs. With a proven track record across industries, we bring
          expertise and innovation to help your business thrive. Our end-to-end
          services, seamless execution, and long-term partnerships support your
          growth at every step. Combining global expertise with local insights,
          we provide scalable, relevant solutions. Committed to integrity and
          transparency, we ensure clear communication and results-driven
          outcomes. With Ramserv, you gain a dedicated team invested in your
          success.
        </SectionTitle>
      </MotionSection>
      <Benefits data={benefitOne} />
    </>
  );
}
