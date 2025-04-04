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
import { XMarkIcon } from "@heroicons/react/24/solid";

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

  /* testing desktop+mobile icons */
  const [isDemoDesktopView, setIsDemoDesktopView] = useState<boolean>(true);

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
        [
          ".demo",
          { opacity: 0, scale: 0.3 },
          { /* duration: 0.2 */ duration: 0.35, at: 0 },
        ],
        [
          `.project-info${selectedIndex}`,
          { opacity: 1, x: "-0px" },
          { duration: 0.25, delay: stagger(0.05), /* at: 0 */ at: 0.2 },
        ],
        [".img", { opacity: 1, scale: 1 }, { at: 0.2 }],

        [".show-btn", { opacity: 1, scale: 1 }, { at: ">" }],
        [".back-btn", { opacity: 0, scale: 0 }, { at: 0 }],
        [".header", { opacity: 1 }, { at: 0 }],
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

        [".img", { opacity: 0, scale: 0.5 }, { duration: 0.3, at: 0 }],

        [".show-btn", { opacity: 0, scale: 0 }, { duration: 0.25, at: 0 }],
        [".back-btn", { opacity: 1, scale: 1 }, { at: 0.1 }],
        [".header", { opacity: 0 }, { at: 0 }],
      ]);
    }
  }, [animate, isFullScreen]);

  return (
    <div
      ref={scope}
      id="Work"
      className={`${menuOpen ? "opacity-50" : "opacity-100"}
       md:!opacity-100 transition duration-200 ease-in bg-gray-100 h-[105vh] flex flex-col relative items-center justify-center `}
    >
      <motion.div
        aria-label="PROJECTS"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={` flex flex-col items-center mb-1.5`}
      >
        <h1 className="header sm:text-5xl text-3xl font-bold">Projects</h1>
        <h4 className="sm:text-lg xs:text-base xs:font-extralight text-lg font-semibold text-black/60 xs:text-black ">
          Some of my work
        </h4>
      </motion.div>

      <div
        aria-label="styles.embla"
        className={`${styles.embla} sm:mx-auto sm:max-w-[640px] lg:max-w-[680px] xs:w-[88%] w-full      `}
      >
        <div
          aria-label="styles.embla__viewport"
          className="overflow-hidden   "
          ref={emblaRef}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9 }}
            aria-label="styles.embla__container"
            className="flex flex-row h-auto z-50    "
          >
            {projects?.map((project, index) => (
              <Project
                key={index}
                project={project}
                index={index}
                setEffect={setEffect}
              />
            ))}
          </motion.div>

          {/* NEXT/PREV ARROW-BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className={`${
              isFullScreen && "hidden"
            }  flex justify-between absolute z-30 sm:max-w-[640px] lg:max-w-[680px]        xs:w-[88%] w-full      `}
          >
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </motion.div>
        </div>
      </div>

      {/* DEMO. placed here in Work instead of Project in order to avoid max-w constraints */}
      <img
        // fix for hiding on page load..(effect)
        //disable pointer events to avoid issue when swiping projects (isFullScreen)
        className={`demo ${effect ? "" : "invisible"}  ${
          isFullScreen ? "" : "pointer-events-none "
        } object-cover fixed inset-0 mx-auto    h-[100%]  `}
        //src={projects[selectedIndex]?.demo}
        src={urlFor(projects[selectedIndex]?.demo).url() || undefined}
        alt=""
      />

      {/* BACK button */}
      <div
        //use flex container to avoid positioning issue for button
        className="    w-full flex justify-center absolute z-50    bottom-24 xs:bottom-12"
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
          } flex items-center     bg-black rounded-2xl text-sm px-3 py-2 font-semibold text-white `}
        >
          Close
          <XMarkIcon className="w-4 h-4 text-white ml-1" />
        </button>
      </div>

      {/* DOTS */}
      <motion.div
        className={`z-[50] ${
          isFullScreen ? "hidden" : ""
        } flex space-x-4 max-w-fit mx-auto mt-[8px] shadow-md shadow-gray-400/80 p-2 rounded-xl  `}
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
