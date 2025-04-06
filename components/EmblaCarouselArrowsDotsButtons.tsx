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
      className={` h-[10px] w-[10px] xs:w-[12px] xs:h-[12px] rounded-full flex items-center 
        ${
          selected
            ? "bg-black cursor-default"
            : "bg-gray-300 xs:hover:scale-125"
        }
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
        enabled
          ? " cursor-pointer opacity-30 "
          : "!opacity-0/ !cursor-default/ invisible"
      } ${buttonIsPressed && "!opacity-40"}   arrowButtonEmbla `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronLeftIcon className=" text-white  w-7 h-7" />
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
        enabled
          ? " cursor-pointer opacity-30 "
          : "!opacity-0/ !cursor-default/ invisible"
      } ${buttonIsPressed && "!opacity-40"}      arrowButtonEmbla `}
      onClick={onClick}
      disabled={!enabled}
    >
      <ChevronRightIcon className=" text-white w-7 h-7 " />
    </button>
  );
};
