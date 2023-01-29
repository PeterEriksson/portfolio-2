import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { Project } from "../typings";

export const fetchProjects = async () => {
  /* const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`
  );

  const data = await res.json();

  const projects: Project[] = data.projects;

  //console.log("fetching", projects)

  return projects; */

  /* --------- */
  const query = groq`
*[_type=="project"]  {
    ...,
    technologies[]->
  }`;

  const res = await sanityClient.fetch(query);
  const projects: Project[] = res;

  return projects;
};
