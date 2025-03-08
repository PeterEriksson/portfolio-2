import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useScroll } from "framer-motion";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

function ReturnToTopBtn() {
  const { scrollYProgress } = useScroll();

  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    scrollYProgress.onChange((number) => setScrollY(number));
    //console.log(scrollY);
  }, [scrollYProgress /* , scrollY */]);
  const scrollBreakpoint = 0.95;

  return (
    <ScrollLink
      to="header"
      smooth={true}
      spy={true}
      offset={-40}
      className={`group cursor-pointer fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 border-2 border-gray-700 bg-gray-8/ bg-transparent00 bg-opacity-75 rounded-full transition-opacity duration-500 ${
        scrollY > scrollBreakpoint
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUpIcon className="text-white/60 w-7 h-7 transition-transform ease-in-out duration-300 group-hover:-translate-y-2" />
    </ScrollLink>
  );
}

export default ReturnToTopBtn;
