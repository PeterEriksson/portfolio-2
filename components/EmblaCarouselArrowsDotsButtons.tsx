import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import React from "react";
import styles from "../styles/embla.module.css";

type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={`  ${styles.embla__dot} ${
        selected
          ? styles.embla__dot__selected
          : " transition duration-150 ease-in md:hover:scale-x-110 transform"
      }     w-12  bg-red-600/`}
      type="button"
      onClick={onClick}
    />
  );
};

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${
        enabled ? " cursor-pointer opacity-70 " : "!opacity-0 !cursor-default"
      }      -translate-y-[380px] xxs:-translate-y-[355px] xs:-translate-y-[385px] smaller:-translate-y-[355px] sm:-translate-y-[380px]   transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70`}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronLeftIcon className=" text-white  w-8 h-8" />
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${
        enabled ? " cursor-pointer opacity-70 " : "!opacity-0 !cursor-default"
      }     -translate-y-[380px] xxs:-translate-y-[355px] xs:-translate-y-[385px] smaller:-translate-y-[355px] sm:-translate-y-[380px]  transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70 `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronRightIcon className=" text-white w-8 h-8     " />
    </button>
  );
};
