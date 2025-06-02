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

  return (
    <>
      <header
        id="header"
        className={`   ${
          menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
        }    transition duration-200 ease-in   h-auto pb-4 sm:pb-0 sm:h-[97vh]   flex items-center justify-center bg-mainDarkBlue         `}
      >
        <div className=" xs:w-10/12 w-[88%] flex flex-col sm:flex-row-reverse  items-center justify-between ">
          <div className="md:w-2/5 sm:w-1/2 w-full relative  ">
            <motion.img
              initial={{
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              className={`xs:rounded-xl rounded-md   ${styles.glowingImage}   `}
              //src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
              src={urlFor(pageInfo?.heroImage).url() || undefined}
              alt=""
            />
            <motion.div
              initial={{
                opacity: 0,
              }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{ once: true }}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-black/70 px-5 py-2.5 rounded-2xl flex justify-center items-center space-x-3"
            >
              {socials?.map((social, i) => (
                <SocialIcon
                  key={i}
                  target="_blank"
                  url={social?.url}
                  bgColor="transparent"
                  fgColor="white"
                  className="hover:opacity-60 opacity-80 !h-6 !w-6 "
                />
              ))}
            </motion.div>
          </div>
          {/* change div to motion.div and remove motion.h... */}
          <div className="text-white text-center sm:text-left   pt-4 xs:pt-0   forKicker: relative">
            {/* KICKER  */}
            <Kicker />

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
              className="text-3xl font-bold md:text-5xl"
            >
              Hi{" "}
              <span className="inline-block animate-wave opacity-70">👋</span>
              <br />
              It's me{" "}
              <span
                //text-gradient
                className="bg-gradient-to-r from-white to-react bg-clip-text text-transparent"
              >
                Peter
              </span>
            </motion.h1>

            <motion.h2
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
              className="text-gray-500 text-xl xs:text-2xl"
            >
              I am
              <Typewriter
                words={[
                  " <FrontEndDev />",
                  " <ReactCoder />",
                  " <CreativeCrafter />",
                ]}
                //Control how many times to run. 0 | false to run infinitely
                loop={false}
                cursor
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>
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

            <div
              //MOBILE cta:s (less offset for main cta)
              className="mt-4 sm:hidden   inline-block"
            >
              <ScrollLink
                //MOBILE CTA
                offset={-20}
                to="Work"
                smooth="true"
                className="inline sm:hidden "
              >
                <button
                  className={` ${
                    buttonIsPressed && "!bg-indigo-700/90 "
                  }   group relative hover:bg-indigo-600 bg-indigo-700 transition duration-200 ease-in py-3 w-[220px] rounded-xl focus:outline-none`}
                  onMouseDown={() => setButtonIsPressed(true)}
                  onMouseUpCapture={() => setButtonIsPressed(false)}
                  onMouseLeave={() => setButtonIsPressed(false)}
                >
                  <p className=" text-base font-semibold tracking-wide">
                    View Projects
                  </p>
                </button>
              </ScrollLink>
              {/* SECONDARY CTA mobile (mail) */}
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <button className="relative mt-3 flex items-center justify-center sm:text-base text-sm opacity-[0.55] cursor-pointer border rounded-xl border-white/50 py-2.5 w-[220px]   ">
                  <MailIcon className="h-[23px] w-[23px]  absolute left-12 opacity-90" />
                  {copied ? (
                    <p className="ml-1 text-base opacity-80 transform -translate-y-[2px]">
                      copied ✓
                    </p>
                  ) : (
                    <div className="flex items-center ml-[24px] space-x-0.5 transform -translate-y-[2px]">
                      <p className="text-base opacity-80 tracking-wide ">
                        copy mail
                      </p>
                      <DocumentDuplicateIcon className="h-3 w-3 opacity-80" />
                    </div>
                  )}
                </button>
              </CopyToClipboard>
            </div>

            <div
              //Desktop CTAs (more offset for for main cta)
              className="hidden sm:flex sm:space-x-3 w-fit mt-4   "
            >
              <ScrollLink
                //integrate <button> into ScrollLink
                offset={90}
                to="Work"
                smooth="true"
                className="  "
              >
                <button
                  className={`z-50 shadow-md  shadow-indigo-500/30  ${
                    buttonIsPressed && "shadow-sm scale-[0.97]"
                  }  group relative  bg-gradient-to-br from-indigo-500/60 to-react/80   transition duration-200 ease-in py-3 px-6 rounded-xl focus:outline-none`}
                  onMouseDown={() => setButtonIsPressed(true)}
                  onMouseUpCapture={() => setButtonIsPressed(false)}
                  onMouseLeave={() => setButtonIsPressed(false)}
                >
                  <p className="text-black text-sm font-bold opacity-90">
                    View Projects
                  </p>
                  <ChevronDownIcon
                    className={`text-black   h-[17px] w-[17px] absolute -top-0.5 right-1 group-hover:opacity-90 group-hover:translate-y-4 inline opacity-0  !transition !duration-500 transform ease-in-out `}
                  />
                </button>
              </ScrollLink>

              {/* SECONDARY CTA (Desktop) (mail) */}
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <div className="relative flex items-center sm:text-base text-sm opacity-[0.55] group cursor-pointer border rounded-xl border-white/50 px-2.5  ">
                  <MailIcon className="h-[18px] w-[18px] text-white" />
                  {copied ? (
                    <p className="text-xs ml-1 ">copied ✓</p>
                  ) : (
                    <div className="">
                      <p className="text-sm  ml-1 transition duration-500 ease-in-out group-hover:opacity-0">
                        Ping me
                      </p>
                      <div className="absolute flex items-center left-[32px] translate-y-0.5 group-hover:translate-y-0 top-3 group-hover:opacity-100 opacity-0 transform transition duration-300 ease-in-out delay-200">
                        <p className="text-xs  ">copy mail</p>
                      </div>
                    </div>
                  )}
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`w-screen h-[2vh] sm:h-[3vh] bg-gray-100 sm:bg-gradient-to-b from-mainDarkBlue to-gray-100 transition duration-200 ease-in ${
          menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
        }`}
      />
    </>
  );
}
