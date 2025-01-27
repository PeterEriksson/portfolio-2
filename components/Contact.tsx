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
        menuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in   bg-mainDarkBlue h-screen flex justify-center             for-shape(and blob):-> relative ForRocket: overflow-hidden `}
    >
      {/* SHAPE DIVIDER */}
      {/* <div className={`${styles.customShapeDividerTop}`}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={`${styles.shapeFill}`}
          ></path>
        </svg>
      </div> */}

      <div className=" xs:w-10/12 w-[88%] flex items-center xs:flex-row flex-col-reverse justify-center xxs:justify-between ">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
            //scale: 0.5,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            //scale: 1,
          }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="tempfix(veticalscrollline) xl:pl-[72px] pl-0 !z-30      flex flex-col items-center xxs:inline  "
        >
          <div className={`mb-2 xs:mb-1.5 flex mr-auto xxs:mr-0 mt-3 xxs:mt-0`}>
            <h1 className="sm:text-5xl text-3xl text-white font-bold //text-shadow-glow">
              {" "}
              Ping me!&nbsp;{" "}
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

          <div className="">
            <p className="text-white sm:w-2/3 w-3/4 sm:text-lg text-sm    ">
              {/* {dummyData.contact.contactText} */}
              If you have an opening or any project that I can contribute to, be
              sure to reach out.
            </p>
            <div className="flex items-center space-x-2 mt-2 sm:text-base text-sm ">
              <PhoneIcon className="h-5 w-5 text-white" />
              <p className="text-white">
                {/* dummyData.contact.phone */}
                {pageInfo?.phoneNumber}
              </p>
            </div>
            <div className="mt-1 flex items-center space-x-2 sm:text-base text-sm">
              <MailIcon className="h-5 w-5 text-white" />
              <p className="text-white">
                {/* dummyData.contact.mail */}
                {pageInfo?.email}
              </p>
              <CopyToClipboard text={pageInfo?.email} onCopy={handleCopy}>
                <button className=" text-white ">
                  {copied ? (
                    <span>Copied!</span>
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4 hover:opacity-70" />
                  )}
                </button>
              </CopyToClipboard>
            </div>
            <div className="mt-1 flex items-center space-x-2 sm:text-base text-sm">
              <MapPinIcon className="h-5 w-5 text-white" />
              <p className="text-white">Stockholm, Sweden</p>
            </div>

            {socials?.map((social, i) => (
              <SocialIcon
                key={i}
                target="_blank"
                url={social.url}
                bgColor="transparent"
                fgColor="white"
                className="hover:opacity-70 !h-10 !w-10   "
              />
            ))}
          </div>
        </motion.div>
        {/* RIGHT SIDE - containing profile pic */}
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
          className="rounded-md xs:max-w-xs w-full xs:w-2/5  max-h-60 object-cover xs:max-h-full xs:object-contain "
          src={urlFor(pageInfo?.contactImage).url() || undefined}
          alt=""
        />
      </div>

      <Blob bottomCornerLeft />
    </div>
  );
}
