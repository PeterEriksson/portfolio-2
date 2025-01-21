import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Work from "../components/Work";
import About from "../components/About";
import Stack from "../components/Stack";
import Contact from "../components/Contact";
import VerticalScrollProgress from "../components/VerticalScrollProgress";
import { PageInfo, Project, Skill, SkillDescription, Social } from "../typings";
import LoadingScreen from "../components/LoadingScreen";
import useDataFetch from "../hooks/useDataFetch";

const Home = () => {
  const { pageInfo, skills, skillDescription, projects, socials, isLoading } =
    useDataFetch();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>
          Peter Eriksson - Frontend developer - Next.js, TS, Tailwind
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <VerticalScrollProgress />
      <Hero socials={socials} pageInfo={pageInfo ?? undefined} />
      <Work projects={projects} />
      <About pageInfo={pageInfo ?? undefined} />
      <Stack skillDescription={skillDescription ?? undefined} skills={skills} />
      <Contact pageInfo={pageInfo ?? undefined} socials={socials} />
    </>
  );
};

export default Home;
