import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { Social } from "../typings";

export const fetchSocials = async () => {
  /*  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`);

  const data = await res.json();

  const socials: Social[] = data.socials;

  //console.log("fetching", socials)

  return socials; */
  /* --------- */

  const query = groq`
*[_type=="social"] 
`;

  const res = await sanityClient.fetch(query);
  const socials: Social[] = res;

  return socials;
};
