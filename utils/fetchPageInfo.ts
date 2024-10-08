import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { PageInfo } from "../typings";

/* used for if server fetching data */

export const fetchPageInfo = async () => {
  /*  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`
  ); */

  /*  const data = await res.json(); */

  /*  const pageInfo: PageInfo = data.pageInfo; */

  //console.log("fetching", pageInfo)

  /* ------- */

  const query = groq`
  *[_type=="pageInfo"][0]  {
      ...,
      socials[]->
     
    }`;

  const res = await sanityClient.fetch(query);
  const pageInfo: PageInfo = res;

  return pageInfo;
};
