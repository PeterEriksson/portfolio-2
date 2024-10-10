import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: SkillType;
  directionLeft?: boolean;
};

export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className={`group relative flex cursor-pointer  rounded-full `}>
      {/* temp solution for avoiding horizontal to break on mobile: render two motion.img tags and utilize hidden */}
      {/* Try overflow hidden instead */}
      <motion.img
        initial={{
          /* x: directionLeft ? -200 : 200, */
          x: directionLeft ? -100 : 100,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        /* src="https://avatars.githubusercontent.com/u/17177659?s=280&v=4" */
        src={urlFor(skill?.image).url() || undefined}
        //src={skill?.image}
        className="  rounded-full border  border-gray-500 object-cover h-24 w-24   sm:w-28 sm:h-28 filter group-hover:grayscale transition duration-300 ease-in-out"
      />

      {/* skill info - showing on hover */}
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24  sm:w-28 sm:h-28   rounded-full">
        <div className="flex items-center justify-center h-full relative">
          <p className="absolute pb-10 text-xs sm:text-sm truncate ">
            {skill?.title}
          </p>
          <p className="sm:text-3xl text-2xl font-semibold text-black ">
            {skill?.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
