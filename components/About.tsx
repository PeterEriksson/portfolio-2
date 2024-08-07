import React from "react";
import { PageInfo } from "../typings";
import { motion, useTransform, useScroll } from "framer-motion";
import { urlFor } from "../sanity";
import styles from "../styles/about.module.css";
import { useMenuStore } from "../store/store";

type Props = {
  pageInfo?: PageInfo;
  backgroundInformation?: string;
};

export default function About({
  backgroundInformation,

  pageInfo,
}: Props) {
  const { scrollYProgress } = useScroll();
  //const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const x = useTransform(scrollYProgress, [0, 0.22], ["80px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.6], [0.2, 1, 1]);
  const { menuOpen } = useMenuStore();

  return (
    <div
      id="About"
      className={` ${
        menuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in  bg-gray-200 h-screen flex justify-center             for-shape:-> relative `}
    >
      {/* SHAPE DIVIDER ...comment out for now. */}
      {/* <div className={`${styles.customShapeDividerTop}  xxs:inline hidden`}>
        <svg
          className={`h-10  xs:h-20 `}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className={`${styles.shapeFill}`}
          ></path>
        </svg>
      </div> */}

      <div className="xs:w-10/12 w-[88%] flex flex-col items-center justify-center  xs:justify-between xs:flex-row ">
        {/* LEFT SIDE (TEXT) */}
        <div className="space-y-1 lg:pl-[72px] pl-0   text-center xs:text-start ">
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }}
            viewport={{ once: true }}
            className="font-bold  sm:text-5xl text-3xl"
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
          <article className="space-y-0.5  ">
            <motion.p
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-black  md:text-lg  text-base  sm:w-2/3 xs:w-3/4 w-full"
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
              {/*  For some additional info check cv(link..) */}
            </motion.p>
          </article>
        </div>
        {/* RIGHT SIDE - containing profile pic. useTransform(x + opacity) for larger screens, hide on mobile size....BUG when NOT below Header. */}
        <motion.img
          style={{ x, /* scale, */ opacity }}
          className="hidden ///xs:inline    rounded-lg max-w-xs w-full xs:w-2/5  max-h-64 object-cover xs:max-h-full xs:object-contain "
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt=""
        />

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
          viewport={{ once: true }}
          className="xs:hidden/// rounded-lg xs:w-2/5 object-cover w-full max-h-64 xs:max-h-[80%] "
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt=""
        />
      </div>
    </div>
  );
}
