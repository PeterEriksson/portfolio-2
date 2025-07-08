import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: SkillType;
};

export default function Skill({ skill }: Props) {
  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`group relative flex cursor-pointer  rounded-full `}
      variants={skillVariants}
    >
      <img
        alt={skill?.title}
        src={urlFor(skill?.image).url() || undefined}
        className="rounded-full border  border-gray-200/90 object-cover h-24 w-24   sm:w-28 sm:h-28 md:w-[136px] md:h-[136px] filter group-hover:grayscale transition duration-300 ease-in-out"
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
    </motion.div>
  );
}
