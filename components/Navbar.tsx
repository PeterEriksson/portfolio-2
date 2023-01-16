import React, { useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

/* TEST TEMP */
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import styles from "../styles/navBar.module.css";

type Props = {};

export default function Navbar({}: Props) {
  /* TEST TEMP (now testing y solution in index.js instead....)*/
  /*  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  }); */

  const navData = ["About", "Skills", "Work", "Contact"];

  const [linkActive, setLinkActive] = useState<string>("");

  const handleSetActive = (to: string) => {
    setLinkActive(to);
    //console.log(linkActive);
  };

  /* const [isMenuComponentVisible, setIsMenuComponentVisible] =
    useState<boolean>(false); */

  // TEST TEMP framer nav
  //https://github.com/devamitjha/framer_motion_animated_nav
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //lets start animation
  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.35,
        //delay: 1,
      },
    },
  };

  return (
    <nav
      className={`fixed top-0 w-screen z-50  bg-[#091c29]    flex flex-col  `}
    >
      <section className="flex items-center  text-white justify-between mx-auto py-3  xs:w-10/12 w-[88%]       !z-30 ">
        {/* LEFT div  (PE-logo) */}
        <section className="flex items-center w-full">
          {/* PE-logo */}
          <ScrollLink
            to="header"
            smooth="true"
            /* activeClass={styles._active} */
            spy={true}
            offset={-40}
            onSetActive={handleSetActive}
            /* for some space between link and border -> */
            /* className="pb-1" */
            /* avoid navbar changing height -> have an "invinsible" bottom border -> */
            className={`relative  group  transform transition duration-300 ease-in-out  cursor-pointer`}
          >
            <h1
              className={` text-3xl font-bold  opacity-[0.81] hover:opacity-100  tracking-[4px]  ${
                "header" == linkActive && "!opacity-100"
              }  transform transition duration-300 ease-in-out`}
            >
              PE
              <span
                className={` w-2 h-2 bg-red-500 inline-block rounded-full ml-2 mb-1.5`}
              ></span>
              {/* UNDERLYING BORDER for when active */}
              <div
                className={`${
                  "header" === linkActive && "!opacity-100"
                }    absolute  md:border-b-2 opacity-0 group-hover:opacity-100   w-full transform transition duration-300 ease-in-out`}
              />
            </h1>
          </ScrollLink>
        </section>

        {/* RIGHT div */}
        <section className="space-x-5  md:flex hidden ">
          {navData.map((section, i) => (
            <ScrollLink
              to={section}
              smooth="true"
              key={i}
              /* activeClass={styles._active} */

              /* TEST TEMP */
              offset={section !== "Contact" ? -40 : 0}
              /* ---- */

              spy={true}
              onSetActive={handleSetActive}
              /* for some space between link and border -> */
              /* className="pb-1" */
              className={`relative  group ${
                section === linkActive && "!opacity-100"
              }  opacity-[0.81] hover:opacity-100    transition duration-300 ease-in-out cursor-pointer`}
            >
              <span
                className={` text-xl    transition duration-300 ease-in-out`}
              >
                {section}
              </span>
              <div
                className={`${
                  section === linkActive && "!opacity-100"
                }  absolute border-b-2 opacity-0 group-hover:opacity-100  w-full  transition duration-300 ease-in-out`}
              />
            </ScrollLink>
          ))}
        </section>
        {/* HAMBURGER. Toggle between hamburger and cross  */}
        <section
          //onClick={() => setIsMenuComponentVisible((prev) => !prev)}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`md:!hidden //xl:!hidden  ${styles.menuBtn}   opacity-80 hover:opacity-100    z-40`}
        >
          {/* CROSS */}
          <section
            className={`md:hidden //xl:hidden  ${
              isOpen && styles.burgerAnimation
            } ${styles.burger}`}
          ></section>
        </section>
      </section>

      {/* TEST TEMP horizontal scroll indicator. Looks ok. Maybe use only on mobile screen?...or not. */}
      {/* <motion.div
        className={`${styles.progressBar} md:hidden`}
        style={{ scaleX }}
      /> */}

      {/* MOBILE MENU  */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "70vh", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit="exit"
            className={`md:hidden  flex flex-col items-center justify-center bg-mainDarkBlue text-white space-y-12 `}
          >
            {navData.map((section, i) => (
              <motion.a
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 - i * (0.1 * 1.5) }}
                className={`cursor-pointer text-lg/ text-2xl font-semibold uppercase tracking-[5px] 
            `}
              >
                <ScrollLink
                  onClick={() => setIsOpen((prev) => !prev)}
                  key={i}
                  to={section}
                  smooth="true"
                  activeClass={styles.navSectionActive}
                  spy={true}
                  className=" opacity-80 hover:opacity-100  transition duration-200 ease-in"
                >
                  {section}
                </ScrollLink>
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
}
