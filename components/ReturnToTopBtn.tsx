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
      className={`z-50 group cursor-pointer fixed right-6   bottom-6      flex items-center justify-center w-12 h-12 border-2 border-gray-700 bg-gray-8/ bg-transparent00 bg-opacity-75 rounded-full transition transform opacity ease-in-out duration-500 ${
        scrollY > scrollBreakpoint
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <ChevronUpIcon className="text-white/40 w-7 h-7 transition-transform ease-in-out duration-300 group-hover:-translate-y-2" />
    </ScrollLink>
  );
}

export default ReturnToTopBtn;
