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

export default function Contact({ pageInfo, socials }: Props) {
  const { ref: myEmojiRef, inView: myEmojiElementIsVisible } = useInView();
  const { menuOpen } = useMenuStore();

  const { copied, handleCopy } = useCopyToClipboard();

  return (
    <div
      id="Contact"
      className={`${
        menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
      }   transition duration-200 ease-in   bg-mainDarkBlue h-[102vh] xxs:h-screen  flex justify-center             for-shape(and blob):-> relative ForRocket: overflow-hidden `}
    >
      <div className=" xs:w-10/12 w-[88%] flex items-center xs:flex-row flex-col-reverse justify-center xxs:justify-between ">
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
          className="  !z-30      flex flex-col items-center xxs:inline  "
        >
          <div className={`mb-2 flex mr-auto xxs:mr-0 mt-3 xxs:mt-0`}>
            <h1 className="sm:text-5xl text-3xl text-white font-bold ">
              {" "}
              Contact me&nbsp;{" "}
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
                  }  for-mobile-need-to-declare h+w: h-0.5 w-0.5 text-4xl    `}
                >
                  🚀
                </p>
              )}
            </InView>
          </div>

          <div className="space-y-1.5">
            <div className="mt-1 flex items-center space-x-2 sm:text-base text-sm xl:text-xl text-white/75 ">
              <MailIcon className="h-5 w-5 " />
              <p className="font-semibold">{pageInfo?.email}</p>
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <button className=" text-white/70 ">
                  {copied ? (
                    <span>copied ✓</span>
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4 hover:opacity-75" />
                  )}
                </button>
              </CopyToClipboard>
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:text-base text-sm xl:text-xl text-white/75">
              <PhoneIcon className="h-5 w-5 " />
              <p className="font-semibold">{pageInfo?.phoneNumber}</p>
            </div>
            <div className="mb-1 xxs:mb-0 mt-1 flex items-center space-x-2 sm:text-base text-sm xl:text-xl text-white/70">
              <MapPinIcon className="h-5 w-5 " />
              <p className="font-semibold">Stockholm, Sweden</p>
            </div>

            {/* SOCIALS */}
            <div className="!my-3.5 space-x-3">
              {socials?.map((social, i) => (
                <SocialIcon
                  key={i}
                  target="_blank"
                  url={social.url}
                  bgColor="transparent"
                  fgColor="white"
                  className="hover:opacity-50 opacity-[0.6] !h-9 !w-9  border border-gray-200/20 rounded-md"
                />
              ))}
            </div>
            <hr
              className={`!mt-1.5 !mb-2 h-[1px] w-3/4 sm:w-2/3 lg:w-2/5  bg-gray-300/30 border-0 `}
            />
            <p className="text-white/60 w-3/4 sm:w-2/3 lg:w-2/5 text-mobile-base xs:text-xs-plus lg:text-lg ">
              Let's{" "}
              <span className="font-semibold text-white/90">work together</span>
              . If you have an opening or any project that I can contribute to,
              be sure to reach out.
            </p>
          </div>
        </motion.div>
        {/* RIGHT SIDE - containing profile pic */}
        <motion.img
          initial={{
            opacity: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 1.2,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="rounded-md xs:max-w-xs w-full xs:w-2/5  max-h-60 object-cover xs:max-h-full xs:object-contain "
          src={urlFor(pageInfo?.contactImage).url() || undefined}
          alt=""
        />
      </div>

      <Blob bottomCornerLeft />
      <footer className="absolute bottom-0.5 text-center text-xs w-4/5 xs:text-sm text-gray-500 py-6">
        © 2025 Peter Eriksson.{" "}
        <span className="inline-block">
          Next · Typescript · Sanity · Framer Motion
        </span>
      </footer>
      <ReturnToTopBtn />
    </div>
  );
}
