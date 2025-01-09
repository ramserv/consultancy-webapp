import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LogoIcon from "../images/logo/rsc_logo.png";
import NavBarLink from "~/buttons/navbar-link";
import NavBarButton from "~/buttons/navbar-button";
import DarkModeSwitcher from "~/components/Headers/DarkModeSwitcher";
import video01 from "../images/cover/bg-video-02.mp4";

export default function Headers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video01} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative flex flex-col items-center justify-center h-full text-center text-white bg-black/50">
        <h1 className="text-5xl font-bold">Welcome to My Website</h1>
        <p className="mt-4 text-lg">Your journey starts here.</p>
        <button className="mt-6 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
}

export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  return (
    <div
      className={`transform transition-transform duration-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export const MotionSection = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
