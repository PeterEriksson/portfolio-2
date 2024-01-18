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
import { useState } from "react";
import VerticalScrollLine from "../components/VerticalScrollLine";

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Peter FrontendDev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Header socials={socials} isMenuOpen={isMenuOpen} />

      <VerticalScrollLine />

      <Work
        options={OPTIONS}
        //projects={dummyData.projects}
        projects={projects}
        isMenuOpen={isMenuOpen}
      />

      <Stack
        //skillDescription={dummyData.skillDescription}
        //skills={dummyData.skills}
        skillDescription={skillDescription}
        skills={skills}
        isMenuOpen={isMenuOpen}
      />

      <About
        pageInfo={pageInfo}
        //backgroundInformation={dummyData.backgroundInformation}
        isMenuOpen={isMenuOpen}
      />

      <Contact
        //pageInfo={dummyData.contact}
        pageInfo={pageInfo}
        socials={socials}
        isMenuOpen={isMenuOpen}
      />
    </>
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
