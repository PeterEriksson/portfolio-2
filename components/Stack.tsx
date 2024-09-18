import React, { useState } from "react";
import { Skill as SkillType, SkillDescription } from "../typings";
import Skill from "./Skill";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useMenuStore } from "../store/store";

type Props = {
  skills: SkillType[];
  skillDescription?: SkillDescription;
};

function Stack({ skills, skillDescription }: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { menuOpen } = useMenuStore();

  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.25,
      },
    },
  };

  return (
    <div
      id="Skills"
      className={`${
        menuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in  h-screen bg-white flex flex-col items-center justify-center  (pageNotToBreakOnSkillEffect->) overflow-x-hidden    overflow-hidden`}
    >
      <h1 className=" text-3xl sm:text-5xl font-bold pt-8 xs:pt-4  ">
        Tech I use
      </h1>
      <h4 className=" sm:text-xl text-base font-extralight mb-1 xs:mb-2 ">
        Hover for current proficiency
      </h4>
      {/* SKILLS - sort by progress */}
      <div className={`grid grid-cols-3  xs:grid-cols-4 gap-2 sm:gap-4   `}>
        {skills
          ?.filter((skill) => skill.progress > 0)
          ?.sort((a, b) => a.progress - b.progress)
          .map((skill, i) => {
            /* Make Skill Cards come in from different directions */
            if (i < skills.length / 2) {
              return <Skill skill={skill} key={i} directionLeft />;
            } else return <Skill skill={skill} key={i} />;
          })}
      </div>

      {/* SHOW MORE/LESS test temp */}
      <ChevronDownIcon
        onClick={() => setShowMore((prev) => !prev)}
        className={` text-black h-5 w-5 sm:h-7 sm:w-7 cursor-pointer transform transition duration-300 ${
          showMore ? "-rotate-180 hidden/" : "animate-pulse"
        } `}
      />
      <AnimatePresence initial={false}>
        {showMore && (
          <motion.p
            className="origin-top max-w-[335px] xs:max-w-[400px]  sm:max-w-[600px] text-center font-light /mt-2 /mb-1   sm:text-base text-sm"
            variants={item}
            style={{ originY: 0 }}
            initial={{ height: 0, opacity: 0, scaleY: 0 }}
            animate={{ height: "20%", scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit="exit"
          >
            {skillDescription?.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Stack;
