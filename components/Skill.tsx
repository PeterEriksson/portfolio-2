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
      <motion.img
        initial={{
          x: directionLeft ? -100 : 100,
          opacity: 0.3,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        src={urlFor(skill?.image).url() || undefined}
        className="hidden xs:inline     rounded-full border  border-gray-500 object-cover h-24 w-24   sm:w-28 sm:h-28 md:w-[136px] md:h-[136px] filter group-hover:grayscale transition duration-300 ease-in-out"
      />

      {/* mobile view, only opacity effect */}
      <motion.img
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{ once: true }}
        src={urlFor(skill?.image).url() || undefined}
        className="inline xs:hidden rounded-full border border-gray-500 object-cover h-24 w-24   sm:w-28 sm:h-28 md:w-[136px] md:h-[136px] filter group-hover:grayscale transition duration-300 ease-in-out"
      />

      {/* skill info - showing on hover */}
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24  sm:w-28 sm:h-28 md:w-[136px] md:h-[136px]  rounded-full">
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
