import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Project as ProjectType } from "../typings";
import { urlFor } from "../sanity";
import styles from "../styles/embla.module.css";
import { useFullScreenStore } from "../store/store";
import workStyles from "../styles/work.module.css";

type ProjectProps = {
  project: ProjectType;
  setEffect: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
};

export default function Project({ project, setEffect, index }: ProjectProps) {
  const { toggleFullScreen, isFullScreen } = useFullScreenStore();

  const ref = useRef<HTMLDivElement>(null);

  const handleShowMe = () => {
    //enable effect(invinsible on page load)
    setEffect(true);

    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Scroll to the center of the viewport
      });
    }

    toggleFullScreen();
  };

  return (
    <div
      ref={ref}
      className={` ${styles.embla__slide}   xs:px-4 min-w-0 relative`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="relative "
      >
        <img
          className={`img w-full h-[300px]   lg:h-[330px]     md:max-w-full xs:max-w-[88%] mx-auto xs:rounded-sm "
          }`}
          src={urlFor(project?.image).url() || undefined}
          //src={project.image} //testing
          alt="motion_img"
        />

        <div
          //use flex container to avoid positioning issue (-translate-x-1/2 bug..)
          className={` flex absolute bottom-6 w-full justify-center   bg-transparent text-white`}
        >
          <button
            onClick={handleShowMe}
            className={`w-fit show-btn ${workStyles.enlargeEffect} ${
              isFullScreen ? "pointer-events-none " : "!pointer-events-auto"
            }   bg-black rounded-2xl px-3 py-2 text-sm font-semibold `}
          >
            Show me
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.95 }}
        className={`flex flex-col  `}
      >
        <div
          className={`project-info${index}    flex space-x-2.5 items-center justify-center   `}
        >
          <h3 className=" text-xl sm:text-2xl font-bold mx-auto cursor-default opacity-[0.88]">
            {project?.title}
          </h3>
          <div className=" absolute flex items-center space-x-2 justify-end w-[87%] xs:w-3/4">
            <a
              href={project?.linkToBuild}
              target="_blank"
              className="hover:opacity-70 !z-40 text-[#555555] cursor-pointer !h-6 !w-6 sm:!h-6 sm:!w-6 transition duration-150 ease-in"
            >
              <ArrowTopRightOnSquareIcon />
            </a>
            <SocialIcon
              target="_blank"
              url={project?.linkToGithub}
              bgColor="transparent"
              fgColor="#555555"
              className="hover:opacity-70 cursor-pointer !h-10 !w-10 sm:!w-10 sm:!h-10 transition duration-150 ease-in"
            />
          </div>
        </div>

        <p
          className={`project-info${index}     text-mobile-base xs:text-base md:text-lg   text-center mx-1 sm:mx-3 cursor-default /sm:mx-12`}
        >
          {project?.summary}
        </p>

        <div
          className={`project-info${index}  flex justify-center space-x-1 space-y-1 flex-wrap mx-1`}
        >
          {project?.technologies?.map((tech, i) => (
            <div
              key={i}
              className="  px-2 xs:py-1.5 py-1 mt-1 bg-gray-400/40 rounded-full cursor-default flex items-center"
            >
              <p className="text-mobile-small font-medium xs:font-extralight text-black/60 xs:text-black/90">
                {tech?.title}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
