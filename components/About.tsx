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
      emojiSize: 40,
      confettiNumber: 50,
    });
    setHasClicked(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        //duration: 0.55, //...?
        ease: "easeOut",
        staggerChildren: 0.6, // increase stagger delay
        /* delayChildren: 0.2, */ // delay before first child starts
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      //transition: { duration: 0.45, ease: "easeOut" },
      //bouncy effect:
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div
      /* introducing scrollRef got rid of weird bug (not working placing About below Projects. Now works.) */
      ref={scrollRef}
      id="About"
      className={` ${
        menuOpen ? "opacity-50 lg:!opacity-100" : "opacity-100 "
      }  transition duration-200 ease-in  bg-gray-200 h-screen flex justify-center    overflow-x-hidden         for-shape:-> relative `}
    >
      <div className="xs:w-10/12 w-[88%] flex flex-col items-center justify-center  xs:justify-between xs:flex-row     space-y-4 xs:space-y-0 ">
        {/* Text container  */}
        <motion.div
          className=""
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // for when testing, toggle once below
          viewport={{ once: true, amount: 0.6 }}
        >
          {/* blue vertical line on mobile */}
          <motion.div variants={childVariants} className="flex items-center">
            <div className="block xs:hidden w-1 h-[24px] bg-mainDarkBlue// bg-react mr-2"></div>
            <h1 className="sm:text-5xl text-3xl font-bold">About</h1>
          </motion.div>

          <motion.h4
            variants={childVariants}
            className=" sm:text-2xl text-lg font-semibold xs:font-bold text-black/60 xs:text-black"
          >
            Here is a{" "}
            <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 removeForNow: //after:w-full after:h-[2px] after:bg-gradient-to-r after:from-mainDarkBlue/70 after:to-react after:opacity-70">
              little
            </span>{" "}
            background
          </motion.h4>

          <motion.p
            variants={childVariants}
            className="mt-1 text-black text-mobile-base xs:text-base sm:text-lg lg:text-xl sm:w-2/3 xs:w-3/4 w-full"
          >
            {pageInfo?.backgroundInformation &&
              renderAboutText(
                pageInfo.backgroundInformation,
                "stand out",
                handleClick,
                hasClicked
              )}
          </motion.p>
        </motion.div>

        <motion.img
          style={{ x, opacity }}
          className="hidden xs:inline rounded-lg w-full xs:w-2/5  max-h-64 object-cover xs:max-h-full xs:object-contain "
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          alt="desktop about img"
        />

        {/* mobile view, avoid slide in, causes reload on mobile..? */}
        <motion.img
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.9,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="inline xs:hidden rounded-md object-cover w-full max-h-72"
          src={urlFor(pageInfo?.profilePic).url() || undefined}
          //for testing ->
          //src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          alt="mobile about img"
        />
      </div>
    </div>
  );
}
