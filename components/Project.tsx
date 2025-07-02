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
import { NextButton, PrevButton } from "./EmblaCarouselArrowsDotsButtons";

type Props = {
  project: ProjectType;
  setEffect: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;

  scrollPrev?: () => void;
  scrollNext?: () => void;
  prevBtnEnabled?: boolean;
  nextBtnEnabled?: boolean;
};

export default function Project({
  project,
  setEffect,
  index,
  scrollPrev,
  scrollNext,
  prevBtnEnabled,
  nextBtnEnabled,
}: Props) {
  const [showFullSummary, setShowFullSummary] = React.useState<boolean>(false);

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

  const getGradientClass = (index: number) => {
    switch (index) {
      case 0:
        return "from-spotifyGreen to-spotifyBlack";
      case 1:
        return "from-green-500 to-green-200";
      case 2:
        return "from-twitterBlue to-blue-200";
      default:
        return "from-gray-400 to-gray-200"; // Fallback gradient
    }
  };

  const techContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.7,
      transition: {
        delayChildren: 0.01, // Delay before first child animation starts
        staggerChildren: 0.15, // Stagger between each child
      },
    },
  };

  const techItemVariants = {
    hidden: { opacity: 0 /* y: 10 */ },
    show: {
      opacity: 1,
      /* y: 0, */
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  return (
    <div
      ref={ref}
      className={` ${styles.embla__slide}  px-3.5 //xs:px-0  min-w-0   relative   `}
    >
      <div className="relative  flex justify-between items-center  border border-gray-200 xxs:border-gray-200/90 rounded-sm     upper-div-card">
        {/* NEXT+PREV BTNs */}
        <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 pointer-events-auto z-50 ">
          <PrevButton
            onClick={scrollPrev ?? (() => {})}
            enabled={!!prevBtnEnabled}
          />
        </div>
        <div className="absolute -right-[14px] top-1/2 -translate-y-1/2 pointer-events-auto z-50">
          <NextButton
            onClick={scrollNext ?? (() => {})}
            enabled={!!nextBtnEnabled}
          />
        </div>

        <div
          className={`relative bg-gradient-to-br ${getGradientClass(index)}  
             w-[50%] aspect-[1/1] rounded-sm overflow-visible`}
        >
          {/* MOBILE */}
          <motion.img
            //use translate-y in motion properties instead. (bug if mixing..)
            initial={{ opacity: 0, x: "5%", y: "5%" }}
            whileInView={{ opacity: 1, x: /* "10%" */ "12%", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            src={urlFor(project?.image).url() || undefined}
            alt="project_img"
            className="xxs:hidden absolute w-full rounded-sm aspect-auto aspect-[12/10]// top-[17%] "
          />
          {/* DESKTOP */}
          <motion.img
            //use translate-x in inital(below) instead. (bug if mixing xxs:!translate-x-[22%]..)
            initial={{ opacity: 0, x: "10%", y: "10%" }}
            whileInView={{ opacity: 1, x: "20%", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            src={urlFor(project?.image).url() || undefined}
            alt="project_img"
            className="hidden xxs:block absolute w-full rounded-sm aspect-auto top-[17%]   "
          />
        </div>

        {/* PROJECT-TECH div */}
        <div className="mr-5 group/parent">
          <h1 className="cursor-default opacity-0 translate-y-2 group-hover/parent:opacity-25 group-hover/parent:delay-[600ms]  group-hover/parent:translate-y-0 transform transition duration-500 ease-in     text-center md-plus:text-start tracking-wider text-xs sm:text-sm md:text-base lg:text-xl mb-1 font-bold  ">
            TECH STACK
          </h1>
          <motion.div
            className="grid grid-cols-2 md-plus:grid-cols-3 gap-1 xs:gap-2 md:gap-3.5 "
            variants={techContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {project?.technologies?.map((tech, i) => (
              <motion.div
                variants={techItemVariants}
                key={i}
                className="group relative flex cursor-pointer rounded-full border border-gray-200/90"
              >
                <img
                  className="projectTechItemSize object-cover rounded-full filter group-hover:grayscale transition duration-300 ease-in-out"
                  src={urlFor(tech?.image).url() || undefined}
                  alt=""
                />
                <div className="projectTechItemSize absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white rounded-full">
                  <div className="flex items-center justify-center h-full relative">
                    <p className="text-xs-plus tracking-wide">{tech?.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div
          //show me btn
          //use flex container to avoid positioning issue (-translate-x-1/2 bug..)
          className={`flex absolute -bottom-2 w-full justify-center text-white    z-50`}
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
      </div>

      <motion.div
        initial={{ opacity: 0 /* y: 50 , weird bug */ }}
        whileInView={{ opacity: 1 /*  y: 0 */ }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className={`flex  mt-1    project-info${index}         `}
      >
        <h2
          className={`text-xl sm:text-2xl text-black/70 opacity-90 cursor-default ${
            showFullSummary
              ? "line-clamp-none"
              : " line-clamp-3  sm:line-clamp-1"
          } `}
        >
          <span className="text-xl xs:text-2xl font-semibold text-black">
            {project?.title}
          </span>

          <span
            className={`ml-2.5 text-lg font-normal text-black/70  
           relative   `}
          >
            {project?.summary}
            {showFullSummary ? (
              <span
                //padding added for clicking/touching on mobile
                onClick={() => setShowFullSummary(false)}
                className="font-semibold tracking-wider text-sm px-2 py-3 opacity-[0.5] hover:opacity-30 cursor-pointer"
              >
                show less
              </span>
            ) : (
              <span
                onClick={() => setShowFullSummary(true)}
                className="hidden xxs:inline/// sm:inline  absolute  top-5 -left-2                hover:opacity-30 cursor-pointer tracking-wider font-semibold text-sm ml-2.5 opacity-[0.5]"
              >
                more
              </span>
            )}
          </span>
        </h2>

        <div
          //LINKS on desktop (github + livebuild)
          className={`items-center space-x-1.5 hidden sm:flex  `}
        >
          <SocialIcon
            target="_blank"
            url={project?.linkToGithub}
            bgColor="transparent"
            fgColor="#555555B3"
            className="hover:opacity-70 cursor-pointer !h-10 !w-10 sm:!w-11 sm:!h-11 transition duration-150 ease-in bg-gray-200/95 rounded-full p-1"
          />
          <a
            href={project?.linkToBuild}
            target="_blank"
            className="hover:opacity-70 h-11 w-11 p-2 cursor-pointer transition duration-150 ease-in   bg-gray-200/95 rounded-full flex items-center justify-center   "
          >
            <ArrowTopRightOnSquareIcon className="text-[#555555]/70 w-9 h-9" />
          </a>
        </div>
      </motion.div>
      <div
        //LINKS (github + livebuild) on mobile + more (mobile screen, up to sm)
        //sm and above screens -> line-clamp-3...
        className={`flex sm:hidden      project-info${index} relative items-center justify-end  space-x-1.5 -ml-2 mt-[1px]  `}
      >
        <p
          //temp solution, 'more' on mobile
          //padding added for larger clickable area
          onClick={() => setShowFullSummary(true)}
          className={`${
            showFullSummary && "hidden"
          } absolute -left-1.5 -top-1.5 sm:hidden cursor-pointer               z-50 p-2 tracking-wider font-semibold text-sm ml-2.5 opacity-[0.3]`}
        >
          show more
        </p>

        <SocialIcon
          target="_blank"
          url={project?.linkToGithub}
          bgColor="transparent"
          fgColor="#555555CC"
          className="hover:opacity-70 cursor-pointer !h-10 !w-10 sm:!w-11 sm:!h-11 transition duration-150 ease-in bg-gray-200 rounded-full p-1"
        />
        <a
          href={project?.linkToBuild}
          target="_blank"
          className="hover:opacity-70 h-10 w-10 p-2 cursor-pointer transition duration-150 ease-in   bg-gray-200/95 rounded-full flex items-center justify-center   "
        >
          <ArrowTopRightOnSquareIcon className="text-[#555555]/70 w-9 h-9" />
        </a>
      </div>
    </div>
  );
}
