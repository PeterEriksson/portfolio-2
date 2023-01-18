import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTypewriter, Cursor } from "react-simple-typewriter";

type Props = {
  isMenuOpen: boolean;
};

export default function Header({ isMenuOpen }: Props) {
  const [animated, setAnimated] = useState<boolean>(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  //typewriter (react emoji ⚛️ only one not bugging  ..| ..😎    )
  const { text: typeWriterText } = useTypewriter({
    words: [
      " <FrontEndDeveloper ‍💻 />",
      " <SelfTaught />",
      " <LookingForReactRole ⚛️ />",
      " Peter 😎",
    ],

    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <header
      id="header"
      className={`${
        isMenuOpen ? "opacity-50" : "opacity-100"
      } transition duration-200 ease-in   min-h-screen flex items-center justify-center bg-[#091c29]`}
    >
      <div className="w-10/12/// xs:w-10/12 w-[88%] flex flex-col md:flex-row-reverse items-center justify-between ">
        <div className="md:w-2/5 w-full">
          <img
            src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
            /* effect="blur" */
            className={`rounded-xl ${!animated && "opacity-0"}  ${
              animated && "transform transition duration-1000 ease-in-out"
            }`}
          />
        </div>
        <div className="text-white text-center md:text-left   pt-4 xs:pt-0       (not interf with Yscroll->) z-40">
          <h1
            className={`
          ${
            !animated && "translate-y-10 opacity-0"
          } transform transition duration-1000 ease-in-out
          text-3xl font-bold md:text-5xl`}
          >
            Hi!
            <br />
            It's me Peter
          </h1>
          <h2
            className={`${
              !animated && "translate-y-10 opacity-0"
            }  text-2xl// text-xl xs:text-2xl      transform transition duration-1000 ease-in-out text-gray-500`}
          >
            I am
            {typeWriterText}
            <Cursor />
          </h2>
          <ScrollLink to="About" smooth="true" offset={-40}>
            <button className=" group relative hover:bg-indigo-600 bg-indigo-700 transition duration-300 transform hover:scale-105 py-3 px-10 text-lg/ uppercase/ rounded-xl mt-5 mb-3 focus:outline-none">
              {/* {resumeData.header.btnText} */}
              <p className=" text-lg uppercase">discover more</p>
              <span
                className={`absolute right-5 top-3  group-hover:opacity-100 group-hover:translate-x-2   sm:inline hidden opacity-0  !transition !duration-500 transform ease-in-out `}
              >
                🔍
              </span>
            </button>
          </ScrollLink>
        </div>
      </div>
    </header>
  );
}
