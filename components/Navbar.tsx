import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { motion, useScroll, AnimatePresence, useSpring } from "framer-motion";
import styles from "../styles/navBar.module.css";
import { useFullScreenStore, useMenuStore } from "../store/store";
import useNavbarVisible from "../hooks/useNavbarVisible";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Navbar() {
  const navData = ["Work", "About", "Skills", "Contact"];
  const { menuOpen, toggleMenu, setMenuClose } = useMenuStore();
  const [linkActive, setLinkActive] = useState<string>("");
  const { isFullScreen } = useFullScreenStore();

  const handleSetActive = (to: string) => {
    setLinkActive(to);
  };

  //https://github.com/devamitjha/framer_motion_animated_nav
  const menuItem = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.25,
      },
    },
  };

  const ref = useRef<HTMLElement>(null);
  useClickOutside(ref, setMenuClose);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { visible } = useNavbarVisible();

  return (
    <nav
      ref={ref}
      className={`${
        // !-translate-y-full makes sure that the whole navbar always moves up, including scroll indicator.
        isFullScreen && " !-translate-y-full pointer-events-none "
      } ${
        visible ? "" : "-translate-y-14    duration-300"
      } hidden xs:flex flex-col   transition transform duration-200 ease-in !fixed !top-0 w-screen z-[60] bg-mainDarkBlue/95 `}
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
            onSetActive={handleSetActive}
            className={`relative  border-b border-transparent    ${
              linkActive !== "header" && styles.hoverAnimation
            }  transform transition duration-300 ease-in-out  cursor-pointer`}
          >
            <h1
              className={`text-3xl font-bold  opacity-[0.5] hover:opacity-100 ${
                linkActive == "header" && "!opacity-100"
              }  tracking-[2px]    transform transition duration-300 ease-in-out`}
            >
              PE
              <span
                className={` w-2 h-2 bg-react inline-block rounded-full ml-2 mb-1.5`}
              ></span>
            </h1>
          </ScrollLink>
        </section>

        {/* RIGHT div */}
        <section className="space-x-6  mdPlus:flex// lg:flex hidden ">
          {navData.map((section, i) => (
            <ScrollLink
              to={section}
              smooth="true"
              key={i}
              activeClass={styles.navSectionActive}
              offset={0}
              spy={true}
              onSetActive={handleSetActive}
              className={` ${
                linkActive !== section && styles.hoverAnimation
              }  border-b border-transparent relative opacity-[0.5] hover:opacity-100 transition duration-300 ease-in-out cursor-pointer`}
            >
              <span className={`text-base transition duration-300 ease-in-out`}>
                {section}
              </span>
            </ScrollLink>
          ))}
        </section>
        {/* HAMBURGER-icon. Toggle between hamburger and cross  */}
        <section
          onClick={() => toggleMenu()}
          className={`mdPlus:!hidden// lg:!hidden  ${styles.menuBtn}   opacity-80 hover:opacity-100    z-40`}
        >
          {/* CROSS */}
          <section
            className={`mdPlus:hidden// lg:hidden  ${
              menuOpen && styles.burgerAnimation
            } ${styles.burger}`}
          ></section>
        </section>
      </section>

      {/* horizontal scroll indicator.  */}

      <motion.div
        className={` fixed top-14 h-[4px] left-0 right-0 bg-white origin-left  `}
        style={{ scaleX }}
      />

      {/* MOBILE MENU  */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            variants={menuItem}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "60vh", opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit="exit"
            className={` lg:hidden ${
              !menuOpen && "pointer-events-none"
            }  flex flex-col items-center justify-center bg-transparent  text-white space-y-12 `}
          >
            {navData.map((section, i) => (
              <motion.h2
                key={i}
                initial={{ y: 45, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 - i * (0.1 * 1.2) }}
                className={`cursor-pointer text-2xl font-semibold uppercase tracking-[5px] 
            `}
              >
                <ScrollLink
                  onClick={() => toggleMenu()}
                  key={i}
                  to={section}
                  smooth="true"
                  offset={section == "Work" ? 30 : 0}
                  activeClass={styles.navSectionActive}
                  spy={true}
                  onSetActive={handleSetActive}
                  className={` ${
                    linkActive !== section && styles.hoverAnimation
                  } border-b-[1px] border-transparent opacity-[0.35] hover:opacity-100  transition duration-200 ease-in`}
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
