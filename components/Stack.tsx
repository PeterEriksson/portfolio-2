import React, { useState } from "react";
import { Skill as SkillType, SkillDescription } from "../typings";
import Skill from "./Skill";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
      <h1 className="text-3xl sm:text-5xl font-bold  ">Tech I use</h1>
      <h4 className="xs:hidden text-lg font-semibold text-black/60  mb-2 ">
        Tap for current proficiency
      </h4>
      <h4 className="hidden xs:inline sm:text-xl text-base font-extralight mb-2 ">
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
              return <Skill skill={skill} key={skill._id} directionLeft />;
            } else return <Skill skill={skill} key={skill._id} />;
          })}
      </div>

      {/* show info */}
      <ChevronRightIcon
        onClick={() => setShowMore((prev) => !prev)}
        className={`hidden xs:inline h-5 w-5 transform transition duration-150 ease-in opacity-50 cursor-pointer ${
          showMore && "rotate-90"
        } `}
      />

      <AnimatePresence initial={false}>
        {showMore && (
          <motion.p
            className="origin-top max-w-[75%] md:max-w-2xl text-center sm:text-lg text-mobile-base"
            variants={item}
            style={{ originY: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ height: 0, opacity: 0 }}
          >
            {skillDescription?.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Stack;
