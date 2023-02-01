import React from "react";
import { Skill as SkillType, SkillDescription } from "../typings";
import Skill from "./Skill";
import { motion, useInView } from "framer-motion";

type Props = {
  skills: SkillType[];
  skillDescription: SkillDescription;
  isMenuOpen: boolean;
};

function Stack({ skills, skillDescription, isMenuOpen }: Props) {
  //console.log(skillDescription);

  //for skillDescription text
  const transition = {
    type: "spring",
    bounce: 0.35,
    duration: 1.5,
  };

  return (
    <div
      id="Skills"
      className={`${
        isMenuOpen ? "opacity-50" : "opacity-100"
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
          ?.sort((a, b) => a.progress - b.progress)
          .map((skill, i) => {
            /* Make Skill Cards come from different directions */
            if (i < skills.length / 2) {
              return <Skill skill={skill} key={i} directionLeft />;
            } else return <Skill skill={skill} key={i} />;
          })}
      </div>

      {/* SKILL DESCRIPTION */}
      <motion.p
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={transition}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        className="  max-w-[335px] xs:max-w-[400px]   sm:max-w-[600px] text-center font-light mt-2 mb-1   sm:text-base text-sm  "
      >
        {/* {skillDescription?.text} */}
        {skillDescription?.text}
      </motion.p>
    </div>
  );
}

export default Stack;
