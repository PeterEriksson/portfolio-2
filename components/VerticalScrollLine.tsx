import { useScroll, useSpring, motion } from "framer-motion";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

function VerticalScrollLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    scrollYProgress.onChange((number) => setScrollY(number));
    //console.log(scrollY);
  }, [scrollYProgress /* , scrollY */]);
  const testScrollYBp = 0.2;

  return (
    <div
      className={`top-56 fixed z-[39] hidden lg:flex flex-col items-center  ${
        scrollY < testScrollYBp ? "opacity-0 pointer-events-none" : "opacity-70"
      }    transition duration-300 ease-in   ml-[92px] xl:ml-[120px]       `}
    >
      <ScrollLink
        to={scrollY > testScrollYBp ? "header" : ""}
        smooth="true"
        spy={true}
        offset={-40}
        className={`${
          scrollY >= testScrollYBp && "cursor-pointer"
        }  border-red-500/70 border-2 rounded-full     hover:!bg-red-500 transition duration-150 ease-in`}
      >
        <img
          src="https://user-images.githubusercontent.com/17027312/121216942-a638aa80-c881-11eb-8ea2-dc0d44815731.png"
          alt=""
          className="h-14 w-14 rounded-full object-cover transition duration-150 ease-in filter brightness-50 hover:brightness-100     "
        />
      </ScrollLink>
      <div className="h-60 bg-red-200 ">
        <motion.div
          className={`origin-top h-full bg-red-500/60  p-0.5 z-10       `}
          style={{ scaleY }}
        />
      </div>
    </div>
  );
}

export default VerticalScrollLine;
