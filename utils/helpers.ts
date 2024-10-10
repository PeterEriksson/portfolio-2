import { RefObject, useEffect } from "react";

export const handleClickOutsideMenu = (
  ref: RefObject<HTMLElement>,
  setMenuClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenuClose();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

// Function to prevent touch-based scrolling (for mobile devices) (testing)
const preventScroll = (event: TouchEvent) => {
  event.preventDefault();
};

//when fullScreen(user viewing demo), disable scrolling
export const setBodyScroll = (isFullScreen: boolean) => {
  if (typeof document !== "undefined") {
    // Apply overflow based on isFullScreen (disable/enable scroll)
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    //disable swiping projects
    document.body.style.pointerEvents = isFullScreen ? "none" : "auto";

    // mobile touch scrolling (testing)
    if (isFullScreen) {
      // Disable touch-based scrolling by adding 'touchmove' listener
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      // Re-enable touch-based scrolling by removing 'touchmove' listener
      document.removeEventListener("touchmove", preventScroll);
    }
  }
};
