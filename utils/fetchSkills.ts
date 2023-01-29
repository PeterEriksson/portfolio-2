import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { Skill } from "../typings";

export const fetchSkills = async () => {
  /* const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);

  const data = await res.json();

  const skills: Skill[] = data.skills;

  console.log("fetching", skills);

  return skills; */
  /* ------- */

  const query = groq`
*[_type=="skill"] 
`;

  const res = await sanityClient.fetch(query);
  const skills: Skill[] = res;

  return skills;
};
