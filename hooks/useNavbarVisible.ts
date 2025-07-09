import { useState, useEffect } from "react";
import { useMenuStore } from "../store/store";
import { debounce } from "../utils/helpers";

export default function useNavbarVisible() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { menuOpen } = useMenuStore();

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    //if hamburger menu active don't do anything
    if (menuOpen) return;

    //console.log("test debounce");

    setVisible(
      (prevState) =>
        !isAtBottom && // hide navbar if at bottom of page
        ((prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 70) ||
          currentScrollPos < 10 ||
          // if just a little scroll down, keep nav in place.
          (prevState && currentScrollPos - prevScrollPos < 70))
    );

    setPrevScrollPos(currentScrollPos);
  }, /* 200 */ 400); //maybe causing mobile-bug. test larger vals.

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return {
    visible,
  };
}
