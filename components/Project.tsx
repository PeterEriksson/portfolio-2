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
      className={` ${styles.embla__slide}  px-2 xs:px-4 min-w-0 relative`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="relative "
      >
        <img
          className={`img w-full h-[300px]   lg:h-[330px]   xs:rounded-sm "
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
        transition={{ duration: 1.1 }}
        className={`flex flex-col  `}
      >
        <div
          className={`project-info${index}  flex space-x-2.5 items-center justify-between   `}
        >
          <h3 className=" text-xl sm:text-2xl font-bold cursor-default opacity-[0.88]">
            {project?.title}
          </h3>
          <div className=" flex items-center space-x-1.5  ">
            <SocialIcon
              target="_blank"
              url={project?.linkToGithub}
              bgColor="transparent"
              fgColor="#555555"
              className="hover:opacity-70 cursor-pointer !h-10 !w-10 sm:!w-11 sm:!h-11 transition duration-150 ease-in"
            />
            <a
              href={project?.linkToBuild}
              target="_blank"
              className="hover:opacity-70 !z-40 text-[#555555] cursor-pointer !h-6 !w-6 sm:!h-7 sm:!w-7 transition duration-150 ease-in"
            >
              <ArrowTopRightOnSquareIcon />
            </a>
          </div>
        </div>

        {/* TECH used test */}
        <div
          className={`project-info${index} xs:space-x-4 flex -mt-1.5 flex-wrap gap-2 `}
        >
          {project?.technologies?.map((tech, i) => (
            <div
              key={i}
              className="space-x-1 mt-1  rounded-full cursor-default flex items-center"
            >
              <img
                className="xs:h-7 xs:w-7 h-6 w-6 object-cover rounded-lg"
                src={urlFor(tech?.image).url() || undefined}
                alt=""
              />
              <p className=" text-mobile-small font-medium xs:font-extralight text-black/60 xs:text-black/90">
                {tech?.title}
              </p>
            </div>
          ))}
        </div>

        <hr
          className={`w-full mt-1 bg-gray-400/60 h-[3px] project-info${index} `}
        />

        <p
          className={`project-info${index} mt-1.5    text-mobile-base xs:text-base md:text-lg   cursor-default `}
        >
          {project?.summary}
        </p>
      </motion.div>
    </div>
  );
}
