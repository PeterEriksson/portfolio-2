import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

/* TEST TEMP */
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "../styles/navBar.module.css";

type Props = {};

export default function Navbar({}: Props) {
  /* TEST TEMP (now testing y solution in index.js....)*/
  /* const { scrollYProgress } = useScroll();
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

  return (
    <nav className={`fixed top-0 w-screen z-50  bg-[#091c29]    `}>
      <section className="flex items-center  text-white justify-between  w-10/12 mx-auto   py-3 flex-col   md:flex md:flex-row          ">
        {/* LEFT div  (PE-logo + hamburger icon) */}
        <section className="flex justify-between items-center w-full">
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
              className={` text-3xl font-bold  opacity-[0.81] hover:opacity-100    ${
                "header" == linkActive && "!opacity-100"
              }  transform transition duration-300 ease-in-out`}
            >
              PORT2(PE)
              <span
                className={` w-2 h-2 bg-red-500 inline-block rounded-full ml-2 mb-1.5`}
              ></span>
              {/* UNDERLYING BORDER for when active */}
              <div
                className={`${
                  "header" === linkActive && "!opacity-100"
                }    absolute border-b-2 opacity-0 group-hover:opacity-100   w-full transform transition duration-300 ease-in-out`}
              />
            </h1>
          </ScrollLink>
        </section>

        {/* RIGHT div */}
        <section className="space-x-5 /mt-2  md:flex hidden">
          {navData.map((item, i) => (
            <ScrollLink
              to={item}
              smooth="true"
              key={i}
              /* activeClass={styles._active} */

              /* TEST TEMP */
              offset={item !== "Contact" ? -40 : 0}
              /* ---- */

              spy={true}
              onSetActive={handleSetActive}
              /* for some space between link and border -> */
              /* className="pb-1" */
              className={`relative  group ${
                item === linkActive && "!opacity-100"
              } opacity-opacityNavLink/ opacity-[0.81] hover:opacity-100  transform transition duration-300 ease-in-out cursor-pointer`}
            >
              <span
                className={` text-xl  transform transition duration-300 ease-in-out`}
              >
                {item}
              </span>
              <div
                className={`${
                  item === linkActive && "!opacity-100"
                }  absolute border-b-2 opacity-0 group-hover:opacity-100  w-full transform transition duration-300 ease-in-out`}
              />
            </ScrollLink>
          ))}
        </section>
      </section>

      {/* TEST TEMP. Looks ok. Maybe use only on mobile screen? */}
      {/* comment out for now while we try scale y solution */}
      {/*  <motion.div className={`${styles.progressBar}`} style={{ scaleX }} /> */}
    </nav>
  );
}
