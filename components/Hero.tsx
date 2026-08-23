import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import { PageInfo, Social } from "../typings";
import { SocialIcon } from "react-social-icons";
import { useMenuStore } from "../store/store";
import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon as MailIcon,
} from "@heroicons/react/24/solid";
import { EnvelopeIcon as MailIconOutline } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { urlFor } from "../sanity";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import styles from "../styles/decorative.module.css";
import Kicker from "./Kicker";

type Props = {
  socials?: Social[];
  pageInfo?: PageInfo;
};

export default function Hero({ socials, pageInfo }: Props) {
  const [buttonIsPressed, setButtonIsPressed] = useState<boolean>(false);
  const { menuOpen } = useMenuStore();

  const { copied, handleCopy } = useCopyToClipboard();

  //desktop ctas
  const ctaContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        ease: "easeIn",
        staggerChildren: 0.3,
        delayChildren: 3, // delay before first child starts
      },
    },
  };

  const ctaChildVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeIn" },
    },
  };

  const emojiRef = React.useRef<HTMLSpanElement>(null);
  const handleEmojiClick = () => {
    const emoji = emojiRef.current;

    if (emoji) {
      emoji.classList.remove("animate-wave-click"); // Reset if needed
      // Trigger reflow to re-apply the animation
      void emoji.offsetWidth; // force reflow
      emoji.classList.add("animate-wave-click");
    }
  };

  /* const handleAnimationEnd = () => {
    if (emojiRef.current) {
      emojiRef.current.classList.remove("animate-wave-click");
    }
  }; */

  return (
    <>
      <header
        id="header"
        // on desktop sizes using stars bg
        className={`   ${
          menuOpen ? "opacity-50 md:opacity-50 lg-plus:opacity-100 " : "  "
        } relative   transition duration-200 ease-in    h-[98vh]  pb-4 sm:pb-0 sm:h-[97vh]   flex justify-center items-center bg-mainDarkBlue    `}
      >
        <div
          //MOBILE scroll signifier
          className="mt-3 sm:hidden  absolute bottom-4  inline-block"
        >
          <div className="w-full text-center pt-6  ">
            {/* <p
              className="
      bg-gradient-to-b from-gray-400/70 via-gray-700 to-gray-400/70
      bg-[length:100%_200%] animate-shimmer
      bg-clip-text text-transparent font-medium text-xl  tracking-wider "
            >
              DISCOVER MORE
            </p> */}
            <p
              className="
      bg-gradient-to-b from-gray-400/80 via-gray-800 to-gray-400/80
      bg-[length:100%_200%] animate-shimmerArrow
      bg-clip-text text-transparent text-4xl text-2xl//   -mt-1 "
            >
              ↓
            </p>
          </div>
        </div>

        <div className=" xs:w-10/12 w-[88%] flex flex-col sm:flex-row-reverse  items-center justify-between ">
          <div className="md:w-2/5 sm:w-1/2 xs:w-3/4 w-full relative group">
            <motion.img
              initial={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`xs:rounded-full rounded-full border-2 xs:border-1 border-white  $//{styles.glowingImage}`}
              src={urlFor(pageInfo?.heroImage).url() || undefined}
              alt=""
            />

            <div
              //TOOLTIP
              className="absolute top-[25%] left-[18%] lg:left-[20%] xl:left-[23%] -translate-y-1/2 
               bg-black/75 text-white text-sm px-3 py-1.5 rounded-lg 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in delay-500
               pointer-events-none whitespace-nowrap z-10    hidden sm:inline"
            >
              That's me 😎
            </div>

            {/* SOCIALS container */}
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-10 xs:bottom-5 left-1/2 -translate-x-1/2 bg-black/60 px-[18px] xs:px-2.5 py-2.5 rounded-2xl flex justify-center items-center space-x-3"
            >
              {socials?.map((social, i) => (
                <SocialIcon
                  key={i}
                  target="_blank"
                  url={social?.url}
                  bgColor="transparent"
                  fgColor="white"
                  className="hover:opacity-60 opacity-70 !h-8 !w-8  sm:!h-6 sm:!w-6"
                />
              ))}
              {/* test include mail-copy on mobile */}
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <button className="xs:hidden flex items-center opacity-70   ">
                  <MailIcon
                    className={`h-[20px] w-[20px] text-white ${
                      copied ? "hidden" : ""
                    }`}
                  />
                  {copied ? (
                    <p className="ml-3 text-base text-white ">Mail copied</p>
                  ) : (
                    <DocumentDuplicateIcon className="absolute right-3 top-2   h-[11px] w-[11px] opacity-80 text-white" />
                  )}
                </button>
              </CopyToClipboard>
            </motion.div>
          </div>

          {/* TEXT DIV */}
          <div className="text-white text-center sm:text-left   pt-4 xs:pt-0   forKicker: relative">
            {/* <Kicker /> */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              transition={{
                duration: 0.8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="text-4xl sm:text-start text-center font-bold md:text-5xl  xs:mb-1 "
            >
              Hey{" "}
              <span
                //mobile wave emoji
                className="xs:hidden inline-block  animate-wave"
              >
                👋
              </span>
              <span
                //desktop wave emoji
                className="hidden ml-1  xs:inline-block animate-wave opacity-70 cursor-pointer"
                ref={emojiRef}
                onClick={handleEmojiClick}
                //onAnimationEnd={handleAnimationEnd}
              >
                👋
              </span>
              <br className="hidden xs:inline" />
              {/* It's me{" "} */} It's{" "}
              <span
                //text-gradient
                className="text-react "
              >
                Peter{" "}
              </span>
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              transition={{
                duration: 1.2,
                delay: 1.5,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="text-gray-500 text-xl xs:text-2xl hidden sm:inline   "
            >
              I am
              <Typewriter
                words={[
                  " <FrontEndDev />",
                  " <CreativeCrafter />",
                  " <ReactCoder />",
                ]}
                //Control how many times to run. 0 | false to run infinitely
                //loop={false}
                loop={3}
                cursor
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>

            {/* MOBILE subheader + lines + subtext */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:hidden w-full flex flex-col items-center mt-1"
            >
              {/* Left line + Title + Right line */}
              <div className="w-full flex items-center justify-center space-x-2 ">
                {/* Left fading line */}
                <div className="flex-grow mt-[2px] h-px bg-gradient-to-r from-gray-300/10 via-gray-400 to-gray-400 rounded-3xl/" />

                <h2 className="text-gray-500 font-light text-lg tracking-wide sm:hidden">
                  &lt; FrontendDeveloper &gt;
                </h2>

                {/* Right fading line */}
                <div className="flex-grow mt-[2px] h-px bg-gradient-to-r from-gray-400 via-gray-400 to-gray-300/10" />
              </div>

              {/* Subtext */}
              <p className="text-gray-500 text-xs font-light text-center -mt-1">
                React · TS · Tailwind
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center sm:justify-start"
              initial={{
                opacity: 0,
                y: 40,
              }}
              transition={{
                duration: 0.8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
            ></motion.div>

            <motion.div
              //Desktop CTAs
              className="hidden sm:flex space-x-2.5 w-fit mt-10   "
              variants={ctaContainerVariants}
              initial="hidden"
              whileInView="visible"
              // for when testing, toggle once below
              viewport={{ once: true /* amount: 0.6 */ }}
            >
              <ScrollLink
                //integrate <button> into ScrollLink
                offset={50}
                to="Work"
                smooth="true"
                className="  "
              >
                <motion.button
                  onMouseDown={() => setButtonIsPressed(true)}
                  onMouseUpCapture={() => setButtonIsPressed(false)}
                  onMouseLeave={() => setButtonIsPressed(false)}
                  variants={ctaChildVariants}
                  //border thickness: p-[..px]
                  className={` z-50  inline-block rounded-xl p-[1px] bg-gradient-to-r from-white to-react shadow-md shadow-indigo-500/30  ${
                    buttonIsPressed &&
                    "!scale-[0.98] shadow-none transition duration-200 ease-out"
                  }`}
                >
                  <motion.div
                    //set the background to mainDarkBlue and thereby enable the gradient border
                    className={`group relative rounded-xl bg-mainDarkBlue py-3 px-6 focus:outline-none`}
                  >
                    <p className="text-white tracking-wider text-sm opacity-90">
                      View projects
                    </p>

                    <ChevronDownIcon
                      className="text-white h-[17px] w-[17px] absolute top-3.5 right-1 
                 opacity-0 group-hover:opacity-100 
                 group-hover:animate-cta-arrow-bounce-down 
                 transition duration-500 ease-in-out"
                    />
                  </motion.div>
                </motion.button>
              </ScrollLink>

              {/* SECONDARY CTA (Desktop) (mail) */}
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <motion.div
                  variants={ctaChildVariants}
                  className="relative flex items-center sm:text-base text-sm group cursor-pointer rounded-xl px-2.5 text-gray-400 "
                >
                  <MailIconOutline className="h-[18px] w-[18px] " />
                  {copied ? (
                    <p className="text-xs ml-1 font-light">Copied ✓</p>
                  ) : (
                    <div className="">
                      <p className="text-sm font-light  ml-1 transition duration-500 ease-in-out group-hover:opacity-0">
                        Ping me
                      </p>
                      <div className="absolute flex items-center left-[32px] translate-y-3 group-hover:translate-y-0 top-[15px] group-hover:opacity-100 opacity-0 transform transition duration-300 ease-in-out delay-200">
                        <p className="flex font-light items-center text-xs whitespace-nowrap">
                          Copy mail
                          <DocumentDuplicateIcon className="w-3 h-3 ml-1 shrink-0" />
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </CopyToClipboard>
            </motion.div>
          </div>
        </div>
      </header>

      <div
        // Scroll down signifier (desktop)
        className={`w-screen h-[1vh] sm:h-[3vh] bg-gray-100 sm:bg-gradient-to-b from-mainDarkBlue to-gray-100 transition duration-200 ease-in ${
          menuOpen
            ? "opacity-50 lg:!opacity-100"
            : "opacity-100 md:bg-gradient-to-b"
        }`}
      />
    </>
  );
}
