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

  //embla__button  ->
  /* z-index: 1;
  color: rgb(249, 249, 249);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 4rem;
  height: 4rem; */

  /* return (
    <button
      className={`${
        !enabled && "opacity-40 cursor-default"
      } transform -translate-y-[900%] sm:-translate-x-9  -translate-x-[23px]  text-black  z-30  flex items-center justify-center  //-translate-y-5 -translate-y-[300px]/  cursor-pointer w-8 h-8 `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronLeftIcon className={`w-[95%] h-[95%] `} />
    </button>
  ); */

  return (
    <button
      className={`${
        enabled ? " cursor-pointer opacity-70 " : "!opacity-0 !cursor-default"
      }  transform   -translate-y-[360px]   transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70`}
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
      }  transform  -translate-y-[360px]    transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70 `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronRightIcon className=" text-white w-8 h-8     " />
    </button>
  );
};
