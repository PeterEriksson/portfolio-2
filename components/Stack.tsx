import React, { useState } from "react";
import { Skill as SkillType, SkillDescription } from "../typings";
import Skill from "./Skill";
import { delay, motion } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { useMenuStore } from "../store/store";

type Props = {
  skills: SkillType[];
  skillDescription?: SkillDescription;
};

function Stack({ skills, skillDescription }: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { menuOpen } = useMenuStore();

  const stackContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // duration: 0.55, //...?

        staggerChildren: 0.12, // increase stagger delay
        delayChildren: 0.1, // delay before first child starts
        ease: "easeOut",
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
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 /* delay: 0.5 */ }}
        className="text-3xl sm:text-5xl font-bold  "
      >
        Tech I use
      </motion.h1>
      <motion.h4
        //Mobile subheader
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="xs:hidden text-lg font-semibold text-black/40  mb-2 "
      >
        Tap for current proficiency
      </motion.h4>
      <motion.h4
        //Desktop subheader
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="hidden xs:inline sm:text-lg text-base font-extralight mb-2 "
      >
        Hover for current proficiency
      </motion.h4>

      {/* SKILLS - sort by progress */}
      <motion.div
        variants={stackContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} //  (amount...: 0.2 -> 20% of the component’s height (or width, for horizontal scroll) must be visible on screen to trigger the animation.)
        className="grid grid-cols-3 xs:grid-cols-4 gap-2 sm:gap-4"
      >
        {skills
          ?.filter((skill) => skill.progress > 0)
          ?.sort((a, b) => a.progress - b.progress)
          .map((skill) => (
            <Skill skill={skill} key={skill._id} />
          ))}
      </motion.div>
    </div>
  );
}

export default Stack;
