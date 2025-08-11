import React, { useState, useEffect, useCallback } from "react";
import { Project as ProjectType } from "../typings";
import {
  DotButton,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowsDotsButtons";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import styles from "../styles/embla.module.css";
import { useFullScreenStore, useMenuStore } from "../store/store";
import Project from "./Project";
import { setBodyScroll } from "../utils/helpers";
import { stagger, useAnimate, motion } from "framer-motion";
import workStyles from "../styles/work.module.css";
import { urlFor } from "../sanity";
import { SocialIcon } from "react-social-icons";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

type Props = {
  projects: ProjectType[];
  slides?: number[];
  options?: EmblaOptionsType;
};

export default function Work({ projects, slides, options }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { menuOpen } = useMenuStore();
  // Hide demo-effect on pageload
  const [effect, setEffect] = useState(false);
  const { isFullScreen, toggleFullScreen } = useFullScreenStore();
  const [scope, animate] = useAnimate();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  //turn off scroll while viewing demo
  React.useEffect(() => {
    //helper file (also handles mobile-touch-scroll)
    setBodyScroll(isFullScreen);
    return () => {
      setBodyScroll(false); // Reset scrolling when unmounting or when changing states
    };
  }, [isFullScreen]);

  const handleBack = () => {
    if (scope.current) {
      scope.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Scroll to the center of the viewport
      });
    }
    toggleFullScreen();
  };

  React.useEffect(() => {
    if (!isFullScreen) {
      animate([
        [".header", { opacity: 1 }, { at: 0.2 }],
        [".demo", { opacity: 0, scale: 0 }, { duration: 0.55, at: 0 }],
        [
          `.project-info${selectedIndex}`,
          { opacity: 1, x: "-0px" },
          { duration: 0.25, delay: stagger(0.05), at: 0.2 },
        ],
        [".show-btn", { opacity: 1, scale: 1 }, { at: ">" }],
        [".back-btn", { opacity: 0, scale: 0 }, { at: 0 }],
        [".upper-div-card", { opacity: 1 }, { at: 0, duration: 0.85 }],
      ]);
    } else {
      animate([
        [
          ".demo",
          { opacity: 1, scale: 1, zIndex: 30 },
          { duration: 0.25, at: 0.25 },
        ],
        [
          `.project-info${selectedIndex}`,
          { opacity: 0, x: "-150px" },
          { duration: 0.2, delay: stagger(0.05), at: 0 },
        ],
        [".show-btn", { opacity: 0, scale: 0 }, { duration: 0.25, at: 0 }],
        [".back-btn", { opacity: 1, scale: 1 }, { at: 0.1 }],
        [".header ", { opacity: 0 }, { at: 0 }],
        [".upper-div-card", { opacity: 0 }, { at: 0.15 }],
      ]);
    }
  }, [animate, isFullScreen]);

  const getGradientClass = (index: number) => {
    switch (index) {
      case 0:
        return "from-spotifyBlack to-spotifyGreen";
      case 1:
        return "from-green-500 to-green-200";
      case 2:
        return "from-twitterBlue to-blue-200";
      default:
        return "from-gray-400 to-gray-200"; // Fallback gradient
    }
  };

  const mobileTechContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.7,
      transition: {
        delayChildren: 1, // Delay before first child animation starts
        staggerChildren: 0.15, // Stagger between each child
      },
    },
  };

  const mobileTechItemVariants = {
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

  /* TESTING with no bg */
  const techIcons = [
    {
      image: "/kicker-tech-icons/react.png",
      alt: "React.js icon",
      title: "React.js",
    },
    {
      image: "/kicker-tech-icons/next.png",
      alt: "Next.js icon",
      title: "Next.js",
    },
    {
      image: "/kicker-tech-icons/typescript.png",
      alt: "TypeScript icon",
      title: "TypeScript",
    },
    {
      image: "/kicker-tech-icons/tw.png",
      alt: "Tailwind CSS icon",
      title: "Tailwind CSS",
    },
  ];

  return (
    <div
      ref={scope}
      id="Work"
      //h-[105vh]/// xs:h-[110vh]/// sm:h-[115vh]///  lg:h-[125vh]/// ->use padding instead. solves show+less bug.
      className={`${menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "}
         transition duration-200 ease-in bg-gray-100 py-14 xs:py-24 lg:py-28            flex flex-col relative items-center justify-center   `}
    >
      <motion.div
        aria-label="PROJECTS-div h1 + h4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5 }}
        className={`header  w-[88%] xs:w-fit flex flex-col items-start xs:items-center mb-3.5 xs:mb-2   `}
      >
        {/* blue vertical line on mobile */}
        <div className="flex items-center">
          <div className="block xs:hidden w-1 h-[24px] bg-react mr-2"></div>
          <h1 className="sm:text-5xl text-3xl font-bold   text-black/60 xs:text-black  ">
            Projects
          </h1>
        </div>
        <h4 className="  sm:text-lg xs:text-base xs:font-extralight text-lg font-semibold text-black/40 xs:text-black ">
          Some of my work
        </h4>
      </motion.div>

      <div
        aria-label="styles.embla   "
        //increase w slightly to compensate px in embla__slide (in Project) (in order for prev+next-btns to be overlayed)

        className={`w-full /w-[90%]      xs:w-[89%] sm:w-[87%] lg:w-[86%]  ${styles.embla}   `}
      >
        <div
          aria-label="styles.embla__viewport"
          className="overflow-hidden         "
          ref={emblaRef}
        >
          <div
            aria-label="styles.embla__container"
            //add spacing between projects here:
            className="flex flex-row z-40 gap-12 xs:gap-x-14 lg:gap-x-20      "
          >
            {projects?.map((project, index) => (
              <Project
                key={index}
                project={project}
                index={index}
                setEffect={setEffect}
                scrollPrev={scrollPrev ?? (() => {})}
                scrollNext={scrollNext ?? (() => {})}
                prevBtnEnabled={prevBtnEnabled}
                nextBtnEnabled={nextBtnEnabled}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DEMO desktop */}
      <img
        // fix for hiding on page load..(effect)
        //(isFullScreen): disable pointer events to avoid issue when swiping projects..and show me btn(2nd time click)
        className={`test: hidden xxs:inline         demo ${
          effect ? "" : "invisible"
        }  ${
          isFullScreen ? "" : "pointer-events-none "
        } object-cover fixed inset-0 mx-auto    h-[100%]  `}
        src={urlFor(projects[selectedIndex]?.demo).url() || undefined}
        alt="demo desktop"
      />
      {/* DEMO mobile */}
      <div
        className={`demo xxs:hidden    fixed inset-0 h-[100%] bg-gradient-to-br  ${getGradientClass(
          selectedIndex
        )}     ${effect ? "" : "invisible"}
        ${isFullScreen ? "" : "pointer-events-none "}
        `}
      >
        <div className="absolute top-[25%]// top-[21%]">
          <motion.div
            className="flex mx-2 space-x-3"
            variants={mobileTechContainerVariants}
            initial="hidden"
            animate={isFullScreen ? "show" : "hidden"}
          >
            {/* {projects[selectedIndex]?.technologies?.map((tech, i) => (
              <h1 key={i}>{tech.title}</h1>
            ))} */}
            {/* {techIcons.map((tech, i) => ( */}
            {projects[selectedIndex]?.technologies?.map((tech, i) => (
              <motion.div
                variants={mobileTechItemVariants}
                key={i}
                className="group relative flex cursor-pointer rounded-full"
              >
                <img
                  className="projectTechItemSize opacity-70 object-cover rounded-full filter group-hover:grayscale transition duration-300 ease-in-out"
                  src={urlFor(tech?.image).url() || undefined}
                  //src={tech?.image}
                  alt={tech?.title || ""}
                />

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8 whitespace-nowrap">
                  {tech?.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-between mx-2">
            <h1
              className={`font-semibold text-4xl text-black mb-2 ${
                isFullScreen
                  ? "translate-y-0 opacity-50"
                  : "translate-y-3 opacity-0"
              } transform duration-[450ms]  ease-in delay-[600ms]   `}
            >
              {projects[selectedIndex]?.title}
            </h1>
            <div
              className={`flex space-x-1.5
              ${
                isFullScreen
                  ? "translate-y-0 opacity-[0.8]"
                  : "translate-y-3 opacity-0"
              } transform duration-[450ms]  ease-in delay-[600ms] 
              `}
            >
              <SocialIcon
                target="_blank"
                url={projects[selectedIndex]?.linkToGithub}
                bgColor="rgba(0,0,0,0.6)"
                fgColor="#ffffffb3" // b3 = 70% opacity
                className="!h-9 !w-9 rounded-full"
              />
              <a
                href={projects[selectedIndex]?.linkToBuild}
                target="_blank"
                className="h-9 w-9 p-2 bg-black/60 rounded-full flex items-center justify-center"
              >
                <ArrowTopRightOnSquareIcon className="text-[#ffffff]/70 w-9 h-9" />
              </a>
            </div>
          </div>

          <img
            className="mt-1.5 "
            src={urlFor(projects[selectedIndex]?.image).url() || undefined}
            alt="demo mobile"
          />
        </div>
      </div>
      <div
        //Back/Close btn
        //use flex container to avoid positioning issue for button
        className="w-full flex justify-center absolute z-50      handle-resizing-screenheight: bottom-1// -bottom-1 xxs:bottom-1 xs:bottom-20 lg:bottom-28 xl:bottom-36 "
      >
        <button
          onClick={handleBack}
          //fix for hiding element-effect on page load..(effect)
          className={`back-btn ${effect ? "" : "invisible"}  ${
            workStyles.shrinkEffect
          } 
          ${
            //scale down effect isn't interrupted by hover
            isFullScreen ? "" : "pointer-events-none"
          } shadow-md shadow-gray-500   ///border ///border-white ///xxs:border-hidden    flex items-center  bg-black rounded-2xl text-sm px-4 py-2.5 text-white font-semibold// `}
        >
          Close
          {/* X icon using css (bolder) */}
          <div className="relative w-[18px] h-[18px] ml-1">
            <span
              //adjuste h-[..] on both span for boldness
              className="absolute top-1/2 left-0 w-full h-[3px] bg-current transform -translate-y-1/2 rotate-45 rounded-full"
            ></span>
            <span className="absolute top-1/2 left-0 w-full h-[3px] bg-current transform -translate-y-1/2 -rotate-45 rounded-full"></span>
          </div>
        </button>
      </div>

      {/* DOTS */}
      <motion.div
        className={`z-[50] ${
          isFullScreen ? "hidden" : ""
        } flex space-x-4 max-w-fit mx-auto mt-[12px] border// border-gray-300 //shadow-md //shadow-gray-400/80 px-3.5 py-2.5 rounded-2xl  `}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.9 }} // 1.5s delay before animation starts
      >
        {scrollSnaps.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.15 }} // stagger effect
          >
            <DotButton
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
