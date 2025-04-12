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
          menuOpen ? "opacity-50" : "opacity-100"
        }   md:!opacity-100 transition duration-200 ease-in     h-[102vh] xxs:h-[98.5vh]       flex items-center justify-center bg-mainDarkBlue         `}
      >
        <div className=" xs:w-10/12 w-[88%] flex flex-col sm:flex-row-reverse  items-center justify-between ">
          <div className="md:w-2/5 sm:w-1/2 w-full  ">
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
              className={`xs:rounded-xl rounded-md  ${styles.glowingImage}   `}
              //src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
              src={urlFor(pageInfo?.heroImage).url() || undefined}
              alt=""
            />
          </div>
          <div className="text-white text-center sm:text-left   pt-4 xs:pt-0  ">
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
              Hi!
              <br />
              It's me Peter.
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
                  " <FrontEndDev ‍💻 />",
                  " <ReactCoder ⚛️ />",
                  " Peter 😎",
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
            >
              {/* fix for small alignment issue for socials section */}
              <div className="sm:-ml-1.5 ">
                {socials?.map((social, i) => (
                  <SocialIcon
                    key={i}
                    target="_blank"
                    url={social?.url}
                    bgColor="transparent"
                    fgColor="white"
                    className="hover:opacity-60 opacity-80 !h-9 !w-9    "
                  />
                ))}
              </div>

              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <div className="ml-2 mt-0.5 relative flex items-center sm:text-base text-sm opacity-80 group cursor-pointer">
                  <MailIcon className="h-5 w-5 text-white" />
                  <button className=" text-white ">
                    {copied ? (
                      <span className="text-sm absolute ml-1 top-2 w-20">
                        Mail copied!
                      </span>
                    ) : (
                      <DocumentDuplicateIcon className="h-3.5 w-3.5 hidden xxs:inline absolute -right-[15px] hover:opacity-60 opacity-0 top-2.5 transition duration-150 ease-in group-hover:opacity-80 transform translate-y-2 group-hover:translate-y-0" />
                    )}
                  </button>
                </div>
              </CopyToClipboard>
            </motion.div>
            <ScrollLink
              //MOBILE (less offset) ->
              //integrate <button> into ScrollLink
              //remove/change offset for mobile screens. create new element..?
              offset={-20}
              to="Work"
              smooth="true"
              className="inline xxs:hidden "
            >
              <button
                className={` ${
                  buttonIsPressed && "!bg-indigo-700/90 "
                } mt-3.5 mb-3 group relative hover:bg-indigo-600 bg-indigo-700 transition duration-200 ease-in py-3 px-10 rounded-xl focus:outline-none`}
                onMouseDown={() => setButtonIsPressed(true)}
                onMouseUpCapture={() => setButtonIsPressed(false)}
                onMouseLeave={() => setButtonIsPressed(false)}
              >
                <p className=" text-lg uppercase tracking-wide">
                  view projects
                </p>
              </button>
            </ScrollLink>
            <ScrollLink
              //DESKTOP (xxs +) ->
              //integrate <button> into ScrollLink
              //remove/change offset for mobile screens. create new element..?
              offset={90}
              to="Work"
              smooth="true"
              className="hidden xxs:inline "
            >
              <button
                className={`z-20  ${
                  buttonIsPressed && "!bg-indigo-700/90 "
                } mt-3.5 mb-3 group relative hover:bg-indigo-600 bg-indigo-700 transition duration-200 ease-in py-3 px-10 rounded-xl focus:outline-none`}
                onMouseDown={() => setButtonIsPressed(true)}
                onMouseUpCapture={() => setButtonIsPressed(false)}
                onMouseLeave={() => setButtonIsPressed(false)}
              >
                <p className=" text-lg uppercase tracking-wide">
                  view projects
                </p>
                <ChevronDownIcon
                  className={`h-[22px] w-[22px] absolute top-0 right-2.5 group-hover:opacity-100 group-hover:translate-y-4 sm:inline hidden opacity-0  !transition !duration-500 transform ease-in-out `}
                />
              </button>
            </ScrollLink>
          </div>
        </div>
      </header>
      <div
        className={`w-screen h-[2vh] xxs:h-[1.5vh] bg-gradient-to-b from-mainDarkBlue to-white`}
      />
    </>
  );
}
