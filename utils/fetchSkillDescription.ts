import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { SkillDescription } from "../typings";

export const fetchSkillDescription = async () => {
  /* const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkillDescription`
  );

  const data = await res.json();

  const skillDescription: SkillDescription = data.skillDescription;

  console.log("fetching", skillDescription);

  return skillDescription; */

  /* ------ */

  const query = groq`
    *[_type=="skillDescription"][0]`;

  const res = await sanityClient.fetch(query);
  const skillDescription: SkillDescription = res;

  return skillDescription;
};
