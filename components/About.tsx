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

export default function About({ backgroundInformation, pageInfo }: Props) {
  const { menuOpen } = useMenuStore();

  const scrollRef = React.useRef(null);
  // Track scroll progress of the target element (scrollRef)
  // 'start end' triggers at the start of the target reaching the end of the viewport
  // 'end start' triggers when the target's end reaches the top of the viewport
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Transform the value of x based on scroll progress (0 to 22% scroll moves from 80px to 0px)
  const x = useTransform(scrollYProgress, [0, 0.22], ["80px", "0px"]);

  // Animate opacity based on scroll progress. Starts at 0.2 opacity at 10% scroll, increases to 0.9 at 30%, and reaches full opacity (1) at 60% scroll progress.
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0.2, 0.9, 1]);

  return (
    <div
      /* introducing scrollRef got rid of weird bug (not working placing About below Projects. Now works.) */
      ref={scrollRef}
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
        <div className="tempfix(verticalscrollline) xl:pl-[72px]     space-y-1 pl-0   text-center xs:text-start ">
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
            className="hidden xs:inline  sm:text-2xl text-lg font-semibold xs:font-bold text-black/60 xs:text-black"
          >
            Here is a{" "}
            <motion.span
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="xs:underline  xs:decoration-red-500"
            >
              little
            </motion.span>{" "}
            background
          </motion.h4>

          <motion.p
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-black sm:!mt-1  text-mobile-base xs:text-base md:text-lg  sm:w-2/3 xs:w-3/4 w-full"
          >
            {/* (for testing) -> */}
            {/* {backgroundInformation} */}

            {pageInfo?.backgroundInformation}
          </motion.p>
        </div>

        <motion.img
          style={{ x, /* scale, */ opacity }}
          className="hidden xs:inline    rounded-lg max-w-xs w-full xs:w-2/5  max-h-64 object-cover xs:max-h-full xs:object-contain "
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt=""
        />

        {/* mobile view, (avoid slide in, breaks page..) */}
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
          className=" inline   xs:hidden   rounded-lg xs:w-2/5 object-cover w-full max-h-72   "
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          alt=""
        />
      </div>
    </div>
  );
}
