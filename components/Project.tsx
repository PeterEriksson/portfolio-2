/* NOT IN USE. Refactor Later and create new Project (Rendered in Work) */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Project as ProjectType } from "../typings";
import { motion, useInView } from "framer-motion";
import { SocialIcon } from "react-social-icons";

import { forwardRef } from "react";
import { urlFor } from "../sanity";

/* NOT IN USE. Refactor Later and create new Project (Rendered in Work) */

type Props = {
  project: ProjectType;
  i: number;
  projectsLength: number;
  projects: ProjectType[];

  currProjectInView?: number;
  setCurrentProjectInView?: Dispatch<SetStateAction<number>>;
  refs: any /* declare refs in ts? */;
};

const Project = (
  {
    project,
    i,
    projects,
    projectsLength,

    currProjectInView,
    setCurrentProjectInView,

    refs,
  }: Props,

  ref: any
) => {
  const scrollRightTest = () => {
    if (i + 1 == projects.length) return;
    refs[i + 1].current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollLeftTest = () => {
    if (i == 0) return;
    refs[i - 1].current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleDotClick = (ind: number) => {
    refs[ind].current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      /* temp */
      id={i.toLocaleString()}
      ref={ref}
      className=" bg-red-400/   w-screen h-[620px] flex-shrink-0 !snap-center flex flex-col space-y-2 !items-center justify-center/  pb-[74px]//  //px-1 /sm:px-0 "
    >
      {/*  <button onClick={scrollRightTest}>scroll r test</button>
      <button onClick={scrollLeftTest}>scroll l test</button> */}

      <motion.img
        initial={{
          y: -300,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        //viewport={{once:true}}

        /* src={urlFor(project?.image).height(300).width(400).url()} */
        /* src={urlFor(project?.image).url()} */
        /*  src={project?.image} */
        alt=""
        className="h-[65%]/ h-[55%] bg-red-500  cursor-pointer   rounded-xl    object-cover//   "
      />

      {/* DOTS */}
      <div className="flex space-x-2  ">
        {projects.map((_, ind) => (
          <span
            onClick={() => handleDotClick(ind)}
            key={ind}
            className={`${
              ind == i ? "opacity-100" : "opacity-60 cursor-pointer "
            } bg-gray-500 h-3 w-3 rounded-full transform transition duration-200 ease-in ${
              ind !== i && "hover:scale-110 "
            }  `}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="  space-y-1.5 px-0  max-w-6xl flex flex-col  !-mt-[1px]"
      >
        <div className=" flex   mx-auto font-semibold relative  -mb-1.5">
          <p className="text-3xl cursor-default"> {project?.title} </p>
          <div className="flex   -space-x-1.5  !absolute !left-full  pl-1">
            <SocialIcon
              target="_blank"
              url={project?.linkToBuild}
              bgColor="transparent"
              fgColor="#555555"
              className="hover:opacity-70 !h-10 !w-9   bg-red-500/"
            />
            <SocialIcon
              target="_blank"
              url={project?.linkToGithub}
              bgColor="transparent"
              fgColor="#555555"
              className="hover:opacity-70  !h-10 !w-9  /bg-blue-400"
            />
          </div>
        </div>

        <p className="text-sm text-center /md:text-left max-w-[450px]">
          {project?.summary}
        </p>
        <div className="mx-auto flex space-x-1 ">
          {project?.technologies?.map((tech, i) => (
            <p className="italic text-xs font-extralight      " key={i}>
              #{tech.title}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default forwardRef(Project);
