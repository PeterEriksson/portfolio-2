import React from "react";
import styles from "../styles/contact-effects.module.css";
import { motion } from "framer-motion";
import { InView, useInView } from "react-intersection-observer";
/* import { MailIcon, PhoneIcon } from "@heroicons/react/solid"; */
import {
  EnvelopeIcon as MailIcon,
  PhoneIcon as PhoneIcon,
} from "@heroicons/react/24/solid";
import { PageInfo } from "../typings";
import dummyData from "../dummyData.json";
import { SocialIcon } from "react-social-icons";

type Props = {
  isMenuOpen: boolean;
};

export default function Contact({ isMenuOpen }: Props) {
  const { ref: myEmojiRef, inView: myEmojiElementIsVisible } = useInView();
  useInView();

  /* const transition = {
    type: "spring",
    bounce: 0.7,
    duration: 1,
  }; */
  return (
    <div
      id="Contact"
      className={`${
        isMenuOpen ? "opacity-50" : "opacity-100"
      } transition duration-200 ease-in   bg-mainDarkBlue h-screen flex justify-center                     for-shape:-> relative ForRocket: overflow-hidden `}
    >
      {/* SHAPE DIVIDER */}
      <div className={`${styles.customShapeDividerTop}`}>
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
      </div>

      <div className="w-10/12/// xs:w-10/12 w-[88%] flex items-center justify-between     ">
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 1 }}
          //transition={transition}

          className=" lg:pl-[72px] pl-0"
        >
          <div
            className={` sm:text-5xl text-3xl text-white font-bold mb-2 xs:mb-3   flex `}
          >
            <h4> Ping me!&nbsp; </h4>
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
                  }  for-mobile-need-to-declare h+w: h-0.5 w-0.5 text-4xl   !z-20 relative`}
                >
                  🚀
                </p>
              )}
            </InView>
          </div>
          <p className="text-white sm:w-2/3 w-3/4 sm:text-base text-sm">
            {dummyData.contact.contactText}
          </p>
          <div className="flex items-center space-x-2 mt-2 sm:text-base text-sm">
            <PhoneIcon className="h-5 w-5 text-white" />
            <p className="text-white">{dummyData.contact.phone}</p>
          </div>
          <div className="mt-1 flex items-center space-x-2 sm:text-base text-sm">
            <MailIcon className="h-5 w-5 text-white" />
            <p className="text-white">{dummyData.contact.mail}</p>
          </div>

          {dummyData.contact.socials.map((social, i) => (
            <SocialIcon
              key={i}
              target="_blank"
              url={social}
              bgColor="transparent"
              fgColor="white"
              className="hover:opacity-70 !h-10 !w-10  (not interfere with scrollY:->) z-40"
            />
          ))}
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
          className=" sm:w-2/5  w-1/2    rounded-lg  max-w-xs "
          src="https://cdn.sanity.io/images/uoku61jk/production/e259ed793cb4471b615f408b9d83aac157975f03-471x603.png?w=2000&fit=max&auto=format"
          alt=""
        />
      </div>
    </div>
  );
}
