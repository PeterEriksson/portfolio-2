import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Stack from "../components/Stack";
import Work from "../components/Work";

import dummyData from "../dummyData.json";
import { PageInfo, Project, Skill, SkillDescription, Social } from "../typings";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkillDescription } from "../utils/fetchSkillDescription";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import Contact from "../components/Contact";

import { EmblaOptionsType } from "embla-carousel-react";
import About from "../components/About";

/* TEST TEMP */
import { motion, useScroll, useSpring } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";

type Props = {
  pageInfo: PageInfo;
  skills: Skill[];
  skillDescription: SkillDescription;
  projects: Project[];
  socials: Social[];
};

const OPTIONS: EmblaOptionsType = {};

export default function Home({
  pageInfo,
  skills,
  skillDescription,
  projects,
  socials,
}: Props) {
  /* TEST TEMP */
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    scrollYProgress.onChange((number) => setScrollY(number));
  }, [scrollYProgress, scrollY]);
  const testScrollYBp = 0.26;

  return (
    <div className={` `}>
      <Head>
        <title>Portfolio 2 Pete</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Header />

      {/* TEST TEMP use scroll vertical implementation with profileImg on top (prince inspiration) */}
      <div
        className={`top-52 fixed z-30 hidden lg:flex flex-col items-center  ${
          scrollY < testScrollYBp ? "opacity-0" : "opacity-70////"
        } ${
          scrollY > 0.8 && "!opacity-0"
        }   transition duration-300 ease-in   ml-[94px] xl:ml-[120px]       `}
      >
        <ScrollLink
          to={scrollY > testScrollYBp ? "header" : ""}
          smooth="true"
          spy={true}
          offset={-40}
          className={`${
            scrollY >= testScrollYBp && "cursor-pointer"
          }         transform transition duration-150 hover:scale-105 ease-in`}
        >
          <img
            src="https://user-images.githubusercontent.com/17027312/121216942-a638aa80-c881-11eb-8ea2-dc0d44815731.png"
            alt=""
            className="h-14 w-14 rounded-full object-cover p-[1.5px] border-red-500/70 border-2    opacity-80  "
          />
        </ScrollLink>
        <div className="h-60 bg-red-200 ">
          <motion.div
            className={`origin-top h-full bg-red-500/50  p-0.5 z-10       `}
            style={{ scaleY }}
          />
        </div>
      </div>

      {/* TESTING ABOUT component */}
      <About
        pageInfo={dummyData.backgroundInformation}
        backgroundInformation={dummyData.backgroundInformation}
      />

      <Stack
        skillDescription={dummyData.skillDescription}
        skills={dummyData.skills} //skillDescription={skillDescription} skills={skills}
      />

      <Work
        options={OPTIONS}
        projects={dummyData.projects} //projects={projects}
      />

      <Contact pageInfo={dummyData.contact} />
    </div>
  );
}

/* export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const skills: Skill[] = await fetchSkills();
  const skillDescription: SkillDescription = await fetchSkillDescription();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocials();

  return {
    props: {
      pageInfo,
      skills,
      skillDescription,
      projects,
      socials,
    },
    //Next.js will attempt tp re-generate the page:
    // - When a reques comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
}; */