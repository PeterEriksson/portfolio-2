import type { GetStaticProps /* , NextPage */ } from "next";
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
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    scrollYProgress.onChange((number) => setScrollY(number));
    //console.log(scrollY);
    //is Performance ok? Do we need debounce?
  }, [scrollYProgress /* , scrollY */]);
  const testScrollYBp = 0.2;

  /* test, isOpen live here instead */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={` `}>
      <Head>
        <title>Portfolio 2 Pete</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Header isMenuOpen={isMenuOpen} />

      {/* USE SCROLL VERTICAL implementation with profileImg on top (prince inspiration) */}
      <div
        className={`top-52// top-56 fixed z-30 hidden lg:flex flex-col items-center  ${
          scrollY < testScrollYBp ? "opacity-0" : "opacity-70"
        }    transition duration-300 ease-in   ml-[92px] xl:ml-[120px]       `}
      >
        <ScrollLink
          to={scrollY > testScrollYBp ? "header" : ""}
          smooth="true"
          spy={true}
          offset={-40}
          className={`${
            scrollY >= testScrollYBp && "cursor-pointer"
          }  border-red-500/70 border-2 rounded-full     hover:!bg-red-500 transition duration-150 ease-in`}
        >
          <img
            src="https://user-images.githubusercontent.com/17027312/121216942-a638aa80-c881-11eb-8ea2-dc0d44815731.png"
            alt=""
            className="h-14 w-14 rounded-full object-cover transition duration-150 ease-in filter brightness-50 hover:brightness-100     "
          />
        </ScrollLink>
        <div className="h-60 bg-red-200 ">
          <motion.div
            className={`origin-top h-full bg-red-500/60  p-0.5 z-10       `}
            style={{ scaleY }}
          />
        </div>
      </div>

      <About
        pageInfo={pageInfo}
        //backgroundInformation={dummyData.backgroundInformation}
        isMenuOpen={isMenuOpen}
      />

      <Stack
        //skillDescription={dummyData.skillDescription}
        //skills={dummyData.skills}
        skillDescription={skillDescription}
        skills={skills}
        isMenuOpen={isMenuOpen}
      />

      <Work
        options={OPTIONS}
        //projects={dummyData.projects}
        projects={projects}
        isMenuOpen={isMenuOpen}
      />

      <Contact
        //pageInfo={dummyData.contact}
        pageInfo={pageInfo}
        socials={socials}
        isMenuOpen={isMenuOpen}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
};
