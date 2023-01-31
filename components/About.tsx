import React from "react";
import { PageInfo } from "../typings";
import { motion } from "framer-motion";
import { urlFor } from "../sanity";

type Props = {
  pageInfo?: PageInfo;
  backgroundInformation?: string;
  isMenuOpen: boolean;
};

export default function About({
  backgroundInformation,
  isMenuOpen,
  pageInfo,
}: Props) {
  return (
    <div
      id="About"
      className={` ${
        isMenuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in  bg-gray-200 h-screen flex justify-center             `}
    >
      {/* <div className="absolute space-y-2  text-center">
        <h1 className="text-5xl font-bold   mt-4">About</h1>
        <h4 className="sm:text-xl text-base font-extralight mb-3 ">
          Some info on me
        </h4>
      </div> */}
      <div className="w-10/12/// xs:w-10/12 w-[88%]  flex items-center justify-between/     xs:justify-between flex-col xs:flex-row justify-center ">
        {/* LEFT SIDE (TEXT) */}
        <div
          /* find effect for one line at a time presentation(prince..)...ok? */
          className="space-y-1  lg:pl-[72px] pl-0  bg-green-500//                   text-center xs:text-start "
        >
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-5xl/// font-bold  sm:text-5xl text-3xl"
          >
            About
          </motion.h1>
          <motion.h4
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl/// sm:text-3xl text-xl    font-semibold    xs:inline //hidden"
          >
            Here is a{" "}
            <motion.span
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="underline decoration-red-500"
            >
              little
            </motion.span>{" "}
            background
          </motion.h4>
          <article className="space-y-0.5           ">
            <motion.p
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-black sm:text-base text-sm/ sm:w-2/3// w-3/4//           text-base  sm:w-2/3 xs:w-3/4 w-full"
            >
              {/* {backgroundInformation} */}
              {pageInfo?.backgroundInformation}
            </motion.p>
            <motion.p
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              viewport={{ once: true }}
            >
              For some additional info check cv(link..)
            </motion.p>
          </article>
        </div>
        {/* RIGHT SIDE - containing profile pic */}

        <motion.img
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          whileInView={{
            opacity: 1,
          }}
          className="rounded-lg max-w-xs  sm:w-2/5//  w-1/2//       w-full xs:w-2/5  max-h-64 object-cover xs:max-h-full xs:object-contain "
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt=""
        />
      </div>
    </div>
  );
}
