import React from "react";
import decorativeStyles from "../styles/decorative.module.css";

// Function to prevent touch-based scrolling (for mobile devices)
const preventScroll = (event: TouchEvent) => {
  event.preventDefault();
};

//when fullScreen(user viewing demo), disable scrolling
export const setBodyScroll = (isFullScreen: boolean) => {
  if (typeof document !== "undefined") {
    // Apply overflow based on isFullScreen (disable/enable scrolling down/up the page)
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";

    // mobile touch scrolling
    /* if (isFullScreen) {
      // Disable touch-based scrolling by adding 'touchmove' listener
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      // Re-enable touch-based scrolling by removing 'touchmove' listener
      document.removeEventListener("touchmove", preventScroll);
    } */
  }
};

//debounce helper
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

//this function highlights a specific word/string within a block of text
//by wrapping the first occurrence
//in a <span> with a provided click handler and optional styling.
//Used in `About.tsx` to attach a confetti-triggering `onClick` event
//to the phrase "stand out" inside `pageInfo.backgroundInformation`.
export function renderAboutText(
  text: string,
  target: string,
  onClick: () => void,
  hasClicked: boolean
): React.ReactNode {
  if (!text || !target) return text;

  const index = text.toLowerCase().indexOf(target.toLowerCase());

  if (index === -1) return text;

  const before = text.slice(0, index);
  const matched = text.slice(index, index + target.length);
  const after = text.slice(index + target.length);

  return (
    <>
      {before}
      <span
        onClick={onClick}
        className={`${!hasClicked && decorativeStyles.stringHighlighted}  `}
      >
        {matched}
      </span>
      {after}
    </>
  );
}
