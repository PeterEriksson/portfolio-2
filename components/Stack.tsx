import React from "react";
import { Skill as SkillType, SkillDescription } from "../typings";
import Skill from "./Skill";
import { motion, useInView } from "framer-motion";

type Props = {
  skills: SkillType[];
  skillDescription: SkillDescription;
};

function Stack({ skills, skillDescription }: Props) {
  //console.log(skillDescription);

  const transition = {
    type: "spring",
    bounce: 0.35,
    duration: 1.2,
  };

  return (
    <div
      id="Skills"
      className="h-screen bg-gray-200/// bg-white flex flex-col items-center justify-center    overflow-x-hidden"
    >
      <h1 className="text-3xl sm:text-5xl font-bold pt-4 mb-1.5">Tech I use</h1>
      <h4 className="sm:text-xl text-base font-extralight mb-3">
        Hover for current proficiency
      </h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4    lg:grid-cols-5/   ">
        {/* sort by progress */}
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
      {/* use p-tag or article-tag? or section-tag? */}
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        /* transition={{
          duration: 1,
        }} */
        transition={transition}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
      >
        <p className="px-7 xs:px-0 max-w-[350px]   sm:max-w-[600px] text-center font-light mt-4 mb-2 text-[12px] sm:text-base   ">
          {/* {skillDescription?.text} */}
          {skillDescription}
        </p>
      </motion.div>
    </div>
  );
}

export default Stack;