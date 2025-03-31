import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import {
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
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

  //if user has clicked Show me-btn, disable the subtle animation.
  const [hasShownDemo, setHasShownDemo] = React.useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleShowMe = () => {
    //enable effect/animation (invinsible on page load)
    setEffect(true);

    setHasShownDemo(true);

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
      //pb-2 makes room for shadow at bottom (can remove px-2 and px-4 and edit img max-w...)
      className={` ${styles.embla__slide}  px-2 xs:px-4.5 min-w-0 relative   pb-2 `}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative "
      >
        <img
          className={`img w-full h-[260px] xxs:h-[300px] lg:h-[330px]       rounded-t-lg  "
          }`}
          src={urlFor(project?.image).url() || undefined}
          //src={project.image} //testing
          alt="motion_img"
        />

        <div
          //show me btn
          //use flex container to avoid positioning issue (-translate-x-1/2 bug..)
          className={`flex absolute bottom-6 w-full justify-center text-white`}
        >
          <button
            //minor css-bug after hovering, barely noticable. Bug disappears after demo-show
            onClick={handleShowMe}
            className={`show-btn w-fit ${
              hasShownDemo ? "" : "animate-show-me-pulse hover:animate-none"
            }   ${
              isFullScreen ? "pointer-events-none " : "!pointer-events-auto"
            }  bg-black rounded-2xl px-3 py-2 border border-gray-900/80      group flex space-x-1.5 items-center`}
          >
            <p
              className={`opacity-80 group-hover:opacity-100  text-sm font-semibold transition duration-200 ease-in-out `}
            >
              Show me
            </p>
            <ArrowsPointingOutIcon
              className={`text-white w-[17px] h-[17px] group-hover:animate-scaleInOut opacity-80  group-hover:opacity-100 transition duration-200 ease-in-out `}
            />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className={`flex flex-col  -mt-1 xxs:-mt-0.5     shadowRemoved: xxs:px-[16px]/// ///xxs:pb-2.5   `}
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

        {/* TECH used */}
        <div
          className={`project-info${index} flex -mt-1.5 flex-wrap  gap-x-2.5 sm:gap-x-4 gap-y-1 `}
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
              <p className=" text-mobile-small font-medium xs:font-extralight text-black/60 xs:text-black/80">
                {tech?.title}
              </p>
            </div>
          ))}
        </div>

        <hr
          className={`w-full mt-1.5 bg-gray-400/30 h-[2px] ${
            isFullScreen ? "invisible" : ""
          }  `}
        />

        <p
          className={`project-info${index}  text-black/70 mt-1 text-mobile-base xs:text-xs-plus cursor-default`}
        >
          {project?.summary}
        </p>
      </motion.div>
    </div>
  );
}
