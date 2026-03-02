import React from "react";
import styles from "../styles/contact-effects.module.css";
import { motion } from "framer-motion";
import { InView, useInView } from "react-intersection-observer";
import {
  DocumentDuplicateIcon,
  EnvelopeIcon as MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { PageInfo, Social } from "../typings";
import dummyData from "../dummyData.json";
import { SocialIcon } from "react-social-icons";
import { useMenuStore } from "../store/store";
import { urlFor } from "../sanity";
import Blob from "./Blob";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import ReturnToTopBtn from "./ReturnToTopBtn";

type Props = {
  pageInfo?: PageInfo;
  socials?: Social[];
};

/* TODO: loop contact items */

export default function Contact({ pageInfo, socials }: Props) {
  const { ref: myEmojiRef, inView: myEmojiElementIsVisible } = useInView();
  const { menuOpen } = useMenuStore();

  const { copied, handleCopy } = useCopyToClipboard();

  return (
    <div
      id="Contact"
      className={`${
        menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
      }for-shape+blob-> relative ForRocket: overflow-hidden   transition duration-200 ease-in   bg-mainDarkBlue  min-h-screen  xs:min-h-[120vh] sm:min-h-screen   //xs:min-h-screen  flex justify-start xs:justify-center              `}
    >
      <Blob />
      <div className=" xs:w-10/12 w-[88%] flex items-center sm:flex-row flex-col-reverse justify-center sm:justify-between   ">
        {/* LEFT SIDE (headers + info) */}
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true /* amount: 0.2 */ }}
          className=" !z-30 flex flex-col items-center xs:inline  "
        >
          <div className={` flex mr-auto xxs:mr-0 ml-auto    `}>
            <h1 className="ml-4 xs:ml-0 sm:text-5xl text-5xl text-white font-bold    ">
              Contact <span className="text-react">me</span> &nbsp;{" "}
            </h1>

            <InView triggerOnce>
              {({
                inView: myEmojiElementIsVisible,
                ref: myEmojiRef,
                entry,
              }) => (
                <p
                  ref={myEmojiRef}
                  className={` ${
                    myEmojiElementIsVisible ? styles.animateEmoji : ""
                  }  for-mobile-need-to-declare-h+w: h-0.5 w-0.5 text-4xl    `}
                >
                  🚀
                </p>
              )}
            </InView>
          </div>
          <h4
            //text-[#dbdee3] - between gray-200 and gray-300
            className="mb-10 sm:mb-[30px] text-lg xs:text-base mt-1.5 font-thin  text-[#dbdee3]  max-w-[260px] sm:max-w-[290px]   xs:text-start"
          >
            Let's
            <span className="text-gray-200  font-medium tracking-wide xs:tracking-normal   ">
              {" "}
              work together.{" "}
            </span>
            If you have an opening or any project that I can contribute to, be
            sure to reach out.
          </h4>
          {/* horizontal line on mobile */}
          <div className="mb-8 h-px w-[260px] xs:ml-0 bg-gray-400/20 sm:w-[32px] " />

          {/* MAIL, NR, LOCATION */}
          <div className="space-y-3 -ml-8  xs:ml-0   rounded-lg/ /p-3 /sm:p-0 /border /sm:border-none /border-gray-800/10 /sm:bg-transparent /bg-gray-900/20">
            <div className="mt-1 contactItemDiv ">
              <MailIcon className="h-8 w-8 xs:h-9 xs:w-9 lg:w-8 lg:h-8 text-gray-200" />
              <p className="text-gray-300/80 text-sm font-extralight  ">
                {pageInfo?.email}
              </p>
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <button className=" text-white/70  !ml-1 ">
                  {copied ? (
                    <span>copied ✓</span>
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4 hover:opacity-75" />
                  )}
                </button>
              </CopyToClipboard>
            </div>
            <div className="mt-2 contactItemDiv">
              <PhoneIcon className="h-8 w-8 xs:h-9 xs:w-9 lg:w-8 lg:h-8 text-gray-200" />
              <p className="text-gray-300/80 text-sm font-extralight  ">
                {pageInfo?.phoneNumber}
              </p>
            </div>
            <div className="mb-1 xxs:mb-0 mt-1 contactItemDiv">
              <MapPinIcon className="h-8 w-8 xs:h-9 xs:w-9 lg:w-8 lg:h-8 text-gray-200" />
              <p className="text-gray-300/80 text-sm font-extralight  ">
                Stockholm, Sweden
              </p>
            </div>
          </div>

          {/* SOCIALS mobile */}
          <div className="flex -ml-2 mt-8 xs:hidden space-x-6">
            {socials?.map((social, i) => (
              <SocialIcon
                key={i}
                target="_blank"
                url={social?.url}
                bgColor="transparent"
                fgColor="white"
                className=" hover:opacity-60 opacity-70 !h-11 !w-11  border border-gray-600 rounded-full  "
              />
            ))}
          </div>
        </motion.div>
        {/* RIGHT SIDE - containing profile pic */}
        <div className="hidden xs:inline   relative w-[90%] xxs:w-[60%] sm:w-1/2 md:w-2/5 lg:max-w-[400px] lg:max-h-[400px] mb-10 sm:mb-0">
          <motion.img
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-full border border-white w-full h-full aspect-square object-cover "
            src={urlFor(pageInfo?.contactImage).url() || undefined}
            alt=""
          />

          {/* Socials within pic */}
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-7 lg:bottom-8 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-2 rounded-2xl flex justify-center items-center space-x-3"
          >
            {socials?.map((social, i) => (
              <div key={i} className="relative group">
                <SocialIcon
                  target="_blank"
                  url={social?.url}
                  bgColor="transparent"
                  fgColor="white"
                  className="hover:opacity-60 opacity-70 !h-7 !w-7 sm:!h-6 sm:!w-6 lg:!h-10 lg:!w-10  "
                />
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 ease-in whitespace-nowrap shadow-lg">
                  {social?.title || "Social"}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <footer className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4/5 text-center text-xs xs:text-sm text-gray-500 py-6">
        © 2026 Peter Eriksson.{" "}
        <span className="inline-block">
          Next · Typescript · Sanity · Framer Motion
        </span>
      </footer>

      <ReturnToTopBtn />
    </div>
  );
}
