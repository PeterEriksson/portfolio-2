import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Work from "../components/Work";
import About from "../components/About";
import Stack from "../components/Stack";
import Contact from "../components/Contact";
import VerticalScrollLine from "../components/VerticalScrollLine";
import { PageInfo, Project, Skill, SkillDescription, Social } from "../typings";
import Loading from "../components/Loading";
import useDataFetch from "../hooks/useDataFetch";
import React from "react";

import dummdyData from "../dummyData.json";

const Home = () => {
  // calling data from client
  const { pageInfo, skills, skillDescription, projects, socials, isLoading } =
    useDataFetch();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>testing Peter Eriksson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <VerticalScrollLine />
      <Header socials={socials} />
      <Work projects={projects} />
      <About pageInfo={pageInfo ?? undefined} />
      <Stack skillDescription={skillDescription ?? undefined} skills={skills} />
      <Contact pageInfo={pageInfo ?? undefined} socials={socials} />

      {/* testing‚ using dummyData */}
      {/* <Head>
        <title>testing Peter Eriksson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Header />

      <Work projects={dummdyData.projects} />
      <About backgroundInformation={dummdyData.backgroundInformation} />   */}
    </>
  );
};
export default Home;
