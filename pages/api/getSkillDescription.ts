import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { SkillDescription } from "../../typings";

const query = groq`
*[_type=="skillDescription"][0]`;

type Data = {
  skillDescription: SkillDescription;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const skillDescription: SkillDescription = await sanityClient.fetch(query);

  res.status(200).json({ skillDescription });
}
