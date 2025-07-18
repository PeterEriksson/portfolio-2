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
        menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
      }   transition duration-200 ease-in h-screen xs:h-[105vh] bg-white flex flex-col items-center justify-center  (pageNotToBreakOnSkillEffect->) overflow-x-hidden    overflow-hidden`}
    >
      <div className="w-[88%] xs:w-10/12/// xs:w-fit     ">
        <motion.div
          //MOBILE ('Tap' subheader)
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.6 }}
          className="xs:hidden "
        >
          {/* <h1 className="sm:text-5xl text-3xl font-bold  ">Tech I use</h1> */}
          {/* blue vertical line on mobile */}
          <div className="flex items-center">
            <div className="block xs:hidden w-1 h-[24px] bg-mainDarkBlue// bg-react mr-2"></div>
            <h1 className="sm:text-5xl text-3xl font-bold">Tech I use</h1>
          </div>
          <h4 className="text-lg font-semibold text-black/40    ">
            Tap for current proficiency
          </h4>
        </motion.div>

        <motion.div
          //DESKTOP ('Hover' subheader)
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.6 }}
          className="hidden xs:inline text-center"
        >
          <h1 className="text-3xl sm:text-5xl font-bold  ">Tech I use</h1>
          <h4 className="sm:text-lg text-base font-extralight  ">
            Hover for current proficiency
          </h4>
        </motion.div>

        {/* SKILLS - sort by progress */}
        <motion.div
          variants={stackContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} //  (amount...: 0.2 -> 20% of the component’s height (or width, for horizontal scroll) must be visible on screen to trigger the animation.)
          className="grid grid-cols-3 xs:grid-cols-4 gap-2 sm:gap-4 mt-2.5"
        >
          {skills
            ?.filter((skill) => skill.progress > 0)
            ?.sort((a, b) => a.progress - b.progress)
            .map((skill) => (
              <Skill skill={skill} key={skill._id} />
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Stack;
