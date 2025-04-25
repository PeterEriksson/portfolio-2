import React from "react";
import { PageInfo } from "../typings";
import { motion, useTransform, useScroll } from "framer-motion";
import { urlFor } from "../sanity";
import { useFullScreenStore, useMenuStore } from "../store/store";
import JSConfetti from "js-confetti";
import { renderAboutText } from "../utils/helpers";

type Props = {
  pageInfo?: PageInfo;
  backgroundInformation?: string;
};

export default function About({ backgroundInformation, pageInfo }: Props) {
  //prevent multiple confetti triggers
  const [hasClicked, setHasClicked] = React.useState(false);
  const { menuOpen } = useMenuStore();
  //'About' interrupts slightly on mobile, show-me-animate in Work
  const { isFullScreen } = useFullScreenStore();

  const scrollRef = React.useRef(null);
  // Track scroll progress of the target element (scrollRef)
  // 'start end' triggers at the start of the target reaching the end of the viewport
  // 'end start' triggers when the target's end reaches the top of the viewport
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Transform the value of x based on scroll progress (0 to 35% scroll moves from 80px to 0px)
  const x = useTransform(scrollYProgress, [0, 0.35], ["80px", "0px"]);

  // Animate opacity based on scroll progress. Starts at 0.2 opacity at 10% scroll, increases to 0.9 at 40%, and reaches full opacity (1) at 70% scroll progress.
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.2, 0.9, 1]);

  const jsConfetti = new JSConfetti();
  const handleClick = () => {
    if (hasClicked) return; // prevent multiple triggers
    jsConfetti.addConfetti({
      emojis: ["🤩", "🎉", "⭐"],
      emojiSize: 30,
      confettiNumber: 50,
    });
    setHasClicked(true);
  };
  return (
    <div
      /* introducing scrollRef got rid of weird bug (not working placing About below Projects. Now works.) */
      ref={scrollRef}
      id="About"
      className={` ${
        menuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in  bg-gray-200 h-screen flex justify-center    overflow-x-hidden         for-shape:-> relative `}
    >
      <div className="xs:w-10/12 w-[88%] flex flex-col items-center justify-center  xs:justify-between xs:flex-row     space-y-4 xs:space-y-0 ">
        {/* LEFT SIDE (TEXT) */}
        <div className="    space-y-1 pl-0   text-center xs:text-start ">
          <motion.h1
            onClick={handleClick}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }}
            viewport={{ once: true }}
            //isFullScreen: avoid 'About' interference when show-me-animate,
            className={`font-bold  sm:text-5xl text-3xl  ${
              isFullScreen && "!opacity-0"
            } transition duration-100 ease-in-out `}
          >
            About
          </motion.h1>
          <motion.h4
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="hidden xs:inline  sm:text-2xl text-lg font-semibold xs:font-bold text-black/60 xs:text-black"
          >
            Here is a{" "}
            <motion.span
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="xs:underline  xs:decoration-red-500"
            >
              little
            </motion.span>{" "}
            background
          </motion.h4>

          {/* <motion.p
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-black sm:!mt-1 text-mobile-base xs:text-base sm:text-lg lg:text-xl sm:w-2/3 xs:w-3/4 w-full"
          >
            {pageInfo?.backgroundInformation}
          </motion.p> */}
          {/* testing confetti click (on part of the info-string) */}
          <motion.p
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-black sm:!mt-1 text-mobile-base xs:text-base sm:text-lg lg:text-xl sm:w-2/3 xs:w-3/4 w-full"
          >
            {pageInfo?.backgroundInformation &&
              renderAboutText(
                pageInfo.backgroundInformation,
                "stand out",
                handleClick,
                hasClicked
              )}
          </motion.p>
        </div>

        <motion.img
          style={{ x, opacity }}
          className="hidden xs:inline   rounded-lg max-w-xs w-full xs:w-2/5  max-h-64 object-cover xs:max-h-full xs:object-contain "
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt=""
        />

        {/* mobile view, (avoid slide in) */}
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
          className=" inline   xs:hidden   rounded-md xs:w-2/5 object-cover w-full max-h-72   "
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          alt=""
        />
      </div>
    </div>
  );
}
