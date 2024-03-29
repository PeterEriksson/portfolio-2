//Work.tsx pre testing

import React, { useState, useEffect, useCallback } from "react";
import { Project as ProjectType } from "../typings";
import { motion } from "framer-motion";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { SocialIcon } from "react-social-icons";
import Project from "./Project";
import {
  DotButton,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowsDotsButtons";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import styles from "../styles/embla.module.css";
import Link from "next/link";
import { urlFor } from "../sanity";

type Props = {
  projects: ProjectType[];
  slides?: number[];
  options?: EmblaOptionsType;
  isMenuOpen: boolean;
};

export default function Work({ projects, slides, options, isMenuOpen }: Props) {
  //console.log(projects);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  //console.log(scrollSnaps); ok.

  //TESTING
  const projectsOrdered = projects?.slice(1).concat(projects[0]);

  return (
    <div
      id="Work"
      className={`${
        isMenuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in  h-screen flex flex-col  bg-gray-100`}
    >
      <div
        aria-label="PROJECTS + Some of my work"
        className="flex flex-col items-center xs:space-y-1 space-y-0.5     xs:mt-8 mt-[60px]  xs:mb-2 mb-1   "
      >
        <h1 className="sm:text-5xl text-3xl font-bold  ">Projects</h1>
        <h3 className="sm:text-xl text-base font-extralight  ">
          Some of my work
        </h3>
      </div>

      <div
        className={`${styles.embla} sm:mx-auto  sm:max-w-[640px]  bg-blue-700//   `}
      >
        <div
          className={`$//{styles.embla__viewport} overflow-hidden  `}
          ref={emblaRef}
        >
          <div
            className={`$//{styles.embla__container} flex flex-row h-auto  `}
          >
            {projectsOrdered?.map((project, index) => (
              <div
                className={`    ${styles.embla__slide}   xs:px-4 px-5       min-w-0 relative   `}
                key={index}
              >
                <motion.img
                  initial={{
                    /*  y: -100, */
                    opacity: 0,
                  }}
                  whileInView={{
                    /*  y: 0, */
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  /* viewport={{ once: true }} */
                  className={` w-full object-right-top// object-left-top sm:object-cover    rounded-lg  h-[248px] xs:!h-[330px]  max-w-[640px]///unnecsry?   `}
                  //src={project?.image}
                  src={urlFor(project?.image).url() || undefined}
                  alt="Your alt text"
                />

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  /* viewport={{ once: true }} */
                  className="flex flex-col "
                >
                  <div className="flex space-x-2.5 items-center justify-center ">
                    <h3 className="text-xl sm:text-2xl font-bold mx-auto cursor-default  underline/ decoration-red-500 opacity-[0.88]">
                      {project?.title}
                    </h3>
                    <div className="absolute flex items-center space-x-2 justify-end w-[87%] xs:w-3/4 ">
                      <a
                        href={project?.linkToBuild}
                        target="_blank"
                        className="hover:opacity-70  !z-40 text-[#555555] cursor-pointer !h-6 !w-6 sm:!h-6 sm:!w-6   transition duration-150 ease-in     "
                      >
                        <ArrowTopRightOnSquareIcon className="  " />
                      </a>
                      <SocialIcon
                        target="_blank"
                        url={project?.linkToGithub}
                        bgColor="transparent"
                        fgColor="#555555"
                        className="hover:opacity-70 cursor-pointer !h-10 !w-10 sm:!w-10 sm:!h-10 transition duration-150 ease-in       "
                      />
                    </div>
                  </div>

                  <p className="font-light text-center mx-3 sm:text-base text-sm/  cursor-default     sm:mx-12">
                    {project?.summary}
                  </p>
                  {/* TECH USED ON PROJECT. TEST TEMP button design ... */}
                  <div className=" bg-red-500// flex ///items-center justify-center space-x-1 space-y-1  flex-wrap  mx-2 ">
                    {project?.technologies?.map((tech, i) => (
                      <div
                        key={i}
                        className=" px-2 xs:py-1.5 py-1 weirdBug..-> mt-1 bg-gray-400/40  rounded-full cursor-default flex items-center"
                      >
                        <p className="italic/ text-xs font-extralight text-black/90   ">
                          {tech?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          {/* NEXT/PREV ARROW-BUTTONS...OK. */}
          <div className=" //bg-green-600  flex justify-between absolute z-30  sm:max-w-[640px]  w-full    px-1.5 ">
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>
        </div>

        {/* DOTS DIV */}
        <div
          className={`${styles.embla__dots} bg-red-400//  space-x-4 opacity-70 max-w-[500px] mx-auto           -translate-y-[270px] xxxs:-translate-y-[250px] xxs:-translate-y-[218px] xs:-translate-y-[210px] smaller:-translate-y-[180px] //sm:-translate-y-[180px]  `}
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
    </div>
  );
}
