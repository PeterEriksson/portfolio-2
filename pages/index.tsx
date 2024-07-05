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
  return (
    <>
      <Head>
        <title>Peter FrontendDev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <VerticalScrollLine />
      <Header socials={socials} />
      <Work options={OPTIONS} projects={projects} />
      <About pageInfo={pageInfo} />
      <Stack skillDescription={skillDescription} skills={skills} />
      <Contact pageInfo={pageInfo} socials={socials} />
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
