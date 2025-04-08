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

  return (
    <div
      ref={ref}
      className={` ${styles.embla__slide}  px-3.5 //xs:px-0  min-w-0   relative   `}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative   flex justify-between items-center  border border-gray-200/95 xxs:border-gray-200/90 rounded-sm     upper-div-card"
      >
        {/* NEXT+PREV BTNs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute -left-[14px] top-1/2 -translate-y-1/2 pointer-events-auto z-50 "
        >
          <PrevButton
            onClick={scrollPrev ?? (() => {})}
            enabled={!!prevBtnEnabled}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute -right-[14px] top-1/2 -translate-y-1/2 pointer-events-auto z-50"
        >
          <NextButton
            onClick={scrollNext ?? (() => {})}
            enabled={!!nextBtnEnabled}
          />
        </motion.div>

        <div
          className={`relative bg-gradient-to-br ${getGradientClass(index)}  
    w-[57%] xxs:w-[50%] aspect-[1/1] rounded-sm overflow-visible`}
        >
          <img
            src={urlFor(project?.image).url() || undefined}
            alt="project_img"
            className="absolute w-full xxs:aspect-auto aspect-[12/10]  xxs:top-[17%] top-[9%]   translate-x-[7%] xxs:translate-x-[22%] lg:translate-x-[25%] rounded-sm"
          />
        </div>

        <div className="mr-3 sm:mr-4 lg:mr-5">
          <h1 className="uppercase tracking-widest text-xs xs:text-base md:text-lg font-bold opacity-25 mb-1  ">
            tech stack
          </h1>
          <div
            className={`grid grid-cols-2 lg:grid-cols-3 gap-1.5 xs:gap-2.5 md:gap-3.5 opacity-70 `}
          >
            {project?.technologies?.map((tech, i) => (
              <div
                key={i}
                className={`group relative flex cursor-pointer  rounded-full `}
              >
                <img
                  className="projectTechItemSize object-cover rounded-full       filter group-hover:grayscale transition duration-300 ease-in-out"
                  src={urlFor(tech?.image).url() || undefined}
                  alt=""
                />

                {/* skill info - showing on hover */}
                <div className="projectTechItemSize absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white  rounded-full">
                  <div className="flex items-center justify-center h-full relative      ">
                    <p className="text-xs xs:text-base tracking-wide   ">
                      {tech?.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 /* y: 50 , weird bug */ }}
        whileInView={{ opacity: 1 /*  y: 0 */ }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className={`flex  mt-1    project-info${index}         `}
      >
        <h2
          className={`text-xl sm:text-2xl text-black/70 opacity-90 cursor-default ${
            showFullSummary
              ? "line-clamp-none"
              : " line-clamp-3 xxs:line-clamp-2 sm:line-clamp-1"
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
                className=" absolute top-5 -left-2 hidden xxs:inline  hover:opacity-30 cursor-pointer         tracking-wider font-semibold text-sm ml-2.5 opacity-[0.5]"
              >
                more
              </span>
            )}
          </span>
        </h2>

        <div
          //LINKS on desktop (github+ livebuild)
          className={`items-center space-x-1.5 hidden xxs:flex  `}
        >
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
            className="hover:opacity-70 !z-40  cursor-pointer transition duration-150 ease-in bg-gray-200 rounded-full p-1 flex items-center justify-center !h-10 !w-10  "
          >
            <ArrowTopRightOnSquareIcon className="text-[#555555]/80" />
          </a>
        </div>
      </motion.div>
      <div
        //LINKS on mobile + more (mobile screen)
        //
        className={`relative  items-center justify-end  space-x-1.5 -ml-2 mt-1  flex xxs:hidden`}
      >
        <p
          //temp solution, 'more' on mobile
          //padding added for larger clickable area
          onClick={() => setShowFullSummary(true)}
          className={`${
            showFullSummary && "hidden"
          } absolute -left-1.5 -top-2 xxs:hidden !z-50 p-2 tracking-wider font-semibold text-sm ml-2.5 opacity-[0.3]`}
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
          className="hover:opacity-70 !z-40  cursor-pointer transition duration-150 ease-in bg-gray-200 rounded-full p-1 flex items-center justify-center !h-10 !w-10  "
        >
          <ArrowTopRightOnSquareIcon className="text-[#555555]/80" />
        </a>
      </div>
    </div>
  );
}
