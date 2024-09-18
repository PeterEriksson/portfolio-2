import { useState, useEffect } from "react";
import { PageInfo, Project, Skill, SkillDescription, Social } from "../typings";

// Custom hook for fetching data and managing loading state
const useDataFetch = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillDescription, setSkillDescription] =
    useState<SkillDescription | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [
          pageInfoRes,
          skillsRes,
          skillDescriptionRes,
          projectsRes,
          socialsRes,
        ] = await Promise.all([
          fetch("/api/getPageInfo"),
          fetch("/api/getSkills"),
          fetch("/api/getSkillDescription"),
          fetch("/api/getProjects"),
          fetch("/api/getSocials"),
        ]);

        const { pageInfo } = await pageInfoRes.json();
        const { skills } = await skillsRes.json();
        const { skillDescription } = await skillDescriptionRes.json();
        const { projects } = await projectsRes.json();
        const { socials } = await socialsRes.json();

        if (isMounted) {
          setPageInfo(pageInfo);
          setSkills(skills);
          setSkillDescription(skillDescription);
          setProjects(projects);
          setSocials(socials);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { pageInfo, skills, skillDescription, projects, socials, isLoading };
};

export default useDataFetch;
