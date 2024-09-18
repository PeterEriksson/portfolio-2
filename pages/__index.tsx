import { useState, useEffect } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Work from "../components/Work";
import About from "../components/About";
import Stack from "../components/Stack";
import Contact from "../components/Contact";
import VerticalScrollLine from "../components/VerticalScrollLine";
import { PageInfo, Project, Skill, SkillDescription, Social } from "../typings";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkillDescription } from "../utils/fetchSkillDescription";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import Loading from "../components/Loading";

type Props = {
  pageInfo: PageInfo;
  skills: Skill[];
  skillDescription: SkillDescription;
  projects: Project[];
  socials: Social[];
};

/* calling data from server (getStaticProps) */
/* not in use */

const Home = ({
  pageInfo,
  skills,
  skillDescription,
  projects,
  socials,
}: Props) => {
  const loadingTime = 1700;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setIsLoading(false), loadingTime);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Peter Eriksson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <VerticalScrollLine />
      <Header socials={socials} />
      <Work projects={projects} />
      <About pageInfo={pageInfo} />
      <Stack skillDescription={skillDescription} skills={skills} />
      <Contact pageInfo={pageInfo} socials={socials} />
    </>
  );
};

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

    revalidate: 3600, // Revalidate the page every hour
  };
};
