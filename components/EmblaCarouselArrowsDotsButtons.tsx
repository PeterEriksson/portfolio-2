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
      className={`relative// w-[12px] h-[12px] rounded-full flex items-center 
        ${selected ? "bg-black cursor-default" : "bg-gray-300 hover:scale-110"}
        transition duration-200 ease-in transform `}
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
  const [buttonIsPressed, setButtonIsPressed] = React.useState<boolean>(false);

  return (
    <button
      onMouseDown={() => setButtonIsPressed(true)}
      onMouseUpCapture={() => setButtonIsPressed(false)}
      onMouseLeave={() => setButtonIsPressed(false)}
      className={`${
        enabled ? " cursor-pointer opacity-90 " : "!opacity-0 !cursor-default"
      } ${
        buttonIsPressed && "!opacity-40"
      }      -translate-y-[388px] xxs:-translate-y-[355px] xs:-translate-y-[385px] smaller:-translate-y-[350px] sm:-translate-y-[340px] lg:-translate-y-[380px]   transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70`}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronLeftIcon className=" text-white  w-8 h-8" />
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;
  const [buttonIsPressed, setButtonIsPressed] = React.useState<boolean>(false);

  return (
    <button
      onMouseDown={() => setButtonIsPressed(true)}
      onMouseUpCapture={() => setButtonIsPressed(false)}
      onMouseLeave={() => setButtonIsPressed(false)}
      className={`${
        enabled ? " cursor-pointer opacity-90 " : "!opacity-0 !cursor-default"
      } ${
        buttonIsPressed && "!opacity-40"
      }      -translate-y-[388px] xxs:-translate-y-[355px] xs:-translate-y-[385px] smaller:-translate-y-[350px] sm:-translate-y-[340px] lg:-translate-y-[380px]  transition duration-150 ease-in hover:opacity-[0.57]  text-black   z-30 flex items-center justify-center  cursor-pointer rounded-full bg-gray-500 opacity-70 `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronRightIcon className=" text-white w-8 h-8 " />
    </button>
  );
};
