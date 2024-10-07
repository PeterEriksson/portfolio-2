// Work.tsx
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

  //disable/enable scrolling+dragging while viewing demo
  React.useEffect(() => {
    //helper file
    setBodyScroll(isFullScreen);
    return () => {
      setBodyScroll(false); // Reset scrolling when unmounting or when changing states
    };
  }, [isFullScreen]);

  // TEST TEMP. Hide on pageload
  const [show, setShow] = useState(false);
  //clearer name ->
  const [disableInitialEffect, setDisableInitialEffect] = useState(false);

  const handleBack = () => {
    if (scope.current) {
      scope.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Scroll to the center of the viewport
      });
    }
    //handle elements in other components (Work headers, About etc)
    toggleFullScreen();
  };

  //test ok. merge the two useEffects...(notes)
  React.useEffect(() => {
    if (!isFullScreen) {
      animate([
        [".demo", { opacity: 0, scale: 0.3 }, { duration: 0.2, at: 0 }],
        [
          ".project-info",
          { opacity: 1, x: "-0px" },
          { duration: 0.25, delay: stagger(0.05) },
        ],
        [".img", { opacity: 1, scale: 1 }, { at: "<" }],

        [".show-btn", { opacity: 1, scale: 1 }, { at: ">" }],
        [".back-btn", { opacity: 0, scale: 0 }, { at: 0 }],
        [".header", { opacity: 1 }, { at: 0 }],
      ]);
    } else {
      animate([
        [
          ".project-info",
          { opacity: 0, x: "-120px" },
          { duration: 0.2, delay: stagger(0.05), at: 0 },
        ],
        [
          ".demo",
          { opacity: 1, scale: 1, zIndex: 30 },
          { duration: 0.25, at: 0.25 },
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
       md:!opacity-100 transition duration-200 ease-in bg-gray-100 h-screen flex flex-col relative   justify-center `}
    >
      <div
        aria-label="PROJECTS + Some of my work"
        className={` flex flex-col items-center  space-y-0.5 xs:mt-7 mt-[60px] mb-1`}
      >
        <h1 className="header sm:text-5xl text-3xl font-bold">Projects</h1>
        <h2 className="header sm:text-xl text-base font-extralight">
          Some of my work
        </h2>
      </div>

      <div
        aria-label="styles.embla"
        className={`${styles.embla} bg-red-500//        sm:mx-auto sm:max-w-[640px] lg:max-w-[680px] `}
      >
        <div
          aria-label="styles.embla__viewport"
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div
            aria-label="styles.embla__container"
            className="flex flex-row h-auto z-50"
          >
            {projects?.map((project, index) => (
              <Project setShow={setShow} key={index} project={project} />
            ))}
          </div>

          <div
            aria-label="NEXT/PREV ARROW-BUTTONS"
            className={`${
              isFullScreen && "hidden"
            }  flex justify-between absolute z-30 sm:max-w-[640px] lg:max-w-[680px] w-full px-3 xxs:px-1.5  `}
          >
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>
        </div>

        <div
          aria-label="EMBLA DOTS"
          className={`${
            isFullScreen && "hidden"
          } header  test-sol-> sm:flex hidden  bg-black/60// //px-4 //rounded-2xl //py-1.5 space-x-4 max-w-fit mx-auto  smaller:-translate-y-[180px]   //-translate-y-[180px] //xxxs:-translate-y-[250px] //xxs:-translate-y-[218px] //xs:-translate-y-[210px]    `}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* DEMO */}
      <img
        // fix for hiding on page load..(show)
        //disable pointer events to avoid issue when swiping projects
        className={`demo ${show ? "" : "invisible"}  ${
          isFullScreen ? "" : "pointer-events-none "
        } object-cover       fixed inset-0 mx-auto xs:rounded-md xs:mt-2    (move to useEffect?->) h-[100%] xs:h-[95%] ..experiment-further... `}
        //src={projects[selectedIndex]?.demo}
        src={urlFor(projects[selectedIndex]?.demo).url() || undefined}
        alt=""
      />

      <div
        //use flex container to avoid positioning issue
        className="w-full flex justify-center absolute bottom-0 z-50"
      >
        <button
          onClick={handleBack}
          //fix for hiding element-effect on page load..(show)
          //when fullScreen, override setBodyScroll fcn-> !pointer-events-auto
          className={`back-btn ${show ? "" : "invisible"}  ${
            workStyles.shrinkEffect
          } ${
            isFullScreen ? "!pointer-events-auto " : "pointer-events-none"
          } //border border-white/70 bg-black rounded-2xl text-sm px-3 py-2 font-semibold text-white `}
        >
          Back
        </button>
      </div>
    </div>
  );
}
