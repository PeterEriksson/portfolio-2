import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import styles from "../styles/navBar.module.css";
import { useMenuStore } from "../store/store";

export default function Navbar() {
  const navData = ["About", "Work", "Skills", "Contact"];

  const { menuOpen, toggleMenu, setMenuClose } = useMenuStore();

  const [linkActive, setLinkActive] = useState<string>("");

  const handleSetActive = (to: string) => {
    setLinkActive(to);
    //console.log(linkActive);
  };

  //https://github.com/devamitjha/framer_motion_animated_nav
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

  //CLICK OUTSIDE DETECTION
  //maybe move to a hooks folder
  //https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  const ref = useRef<HTMLElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenuClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <nav
      ref={ref}
      className={`!fixed !top-0 w-screen !z-50  bg-[#091c29]    flex flex-col       `}
    >
      <section className="flex items-center  text-white justify-between mx-auto py-3  xs:w-10/12 w-[88%]       !z-30 ">
        {/* LEFT div  (PE-logo) */}
        <section className="flex items-center w-full">
          {/* PE-logo */}
          <ScrollLink
            onClick={() => setMenuClose()}
            to="header"
            smooth="true"
            activeClass={styles.navSectionActive}
            spy={true}
            offset={-40}
            onSetActive={handleSetActive}
            className={`relative  border-b border-transparent  ${
              linkActive !== "header" && styles.hoverAnimation
            }  transform transition duration-300 ease-in-out  cursor-pointer`}
          >
            <h1
              className={` text-3xl font-bold  opacity-[0.81] hover:opacity-100 ${
                linkActive == "header" && "!opacity-100"
              }  tracking-[2px]    transform transition duration-300 ease-in-out`}
            >
              PE
              <span
                className={` w-2 h-2 bg-red-500 inline-block rounded-full ml-2 mb-1.5`}
              ></span>
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
              activeClass={styles.navSectionActive}
              offset={section !== "Contact" ? -40 : 0}
              spy={true}
              onSetActive={handleSetActive}
              className={` ${
                linkActive !== section && styles.hoverAnimation
              }      border-b border-transparent  relative ///group opacity-[0.81] hover:opacity-100 transition duration-300 ease-in-out cursor-pointer`}
            >
              <span
                className={` text-xl    transition duration-300 ease-in-out`}
              >
                {section}
              </span>
            </ScrollLink>
          ))}
        </section>
        {/* HAMBURGER. Toggle between hamburger and cross  */}
        <section
          onClick={() => toggleMenu()}
          className={`md:!hidden  ${styles.menuBtn}   opacity-80 hover:opacity-100    z-40`}
        >
          {/* CROSS */}
          <section
            className={`md:hidden  ${menuOpen && styles.burgerAnimation} ${
              styles.burger
            }`}
          ></section>
        </section>
      </section>

      {/* TEST TEMP horizontal scroll indicator. Looks ok. Maybe use only on mobile screen?... */}
      {/* <motion.div
        className={`${styles.progressBar} md:hidden`}
        style={{ scaleX }}
      /> */}

      {/* MOBILE MENU  */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "60vh", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit="exit"
            className={`md:hidden ${
              !menuOpen && "pointer-events-none"
            }  flex flex-col items-center justify-center bg-mainDarkBlue text-white space-y-12 `}
          >
            {navData.map((section, i) => (
              <motion.h2
                key={i}
                initial={{ y: 45, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 - i * (0.1 * 1.7) }}
                className={`cursor-pointer   text-2xl font-semibold uppercase tracking-[5px] 
            `}
              >
                <ScrollLink
                  onClick={() => toggleMenu()}
                  key={i}
                  to={section}
                  smooth="true"
                  activeClass={styles.navSectionActive}
                  spy={true}
                  onSetActive={handleSetActive}
                  className={` ${
                    linkActive !== section && styles.hoverAnimation
                  } border-b-[1px] border-transparent opacity-80 hover:opacity-100  transition duration-200 ease-in`}
                >
                  {section}
                </ScrollLink>
              </motion.h2>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
}
