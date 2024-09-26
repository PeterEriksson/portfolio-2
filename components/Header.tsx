import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import { Social } from "../typings";
import { SocialIcon } from "react-social-icons";
import { useMenuStore } from "../store/store";

type Props = {
  socials?: Social[];
};

export default function Header({ socials }: Props) {
  const [animated, setAnimated] = useState<boolean>(false);
  const [buttonIsPressed, setButtonIsPressed] = useState<boolean>(false);
  const { menuOpen } = useMenuStore();

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <header
      id="header"
      className={`${
        menuOpen ? "opacity-50" : "opacity-100"
      } md:!opacity-100 transition duration-200 ease-in   min-h-screen flex items-center justify-center bg-[#091c29]`}
    >
      <div className=" xs:w-10/12 w-[88%] flex flex-col md:flex-row-reverse items-center justify-between ">
        <div className="md:w-2/5 w-full">
          <img
            src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
            className={`rounded-xl ${!animated && "opacity-0"}  ${
              animated && "transform transition duration-1000 ease-in-out"
            }`}
          />
        </div>
        <div className="text-white text-center md:text-left   pt-4 xs:pt-0  ">
          <h1
            className={`
          ${
            !animated && "translate-y-10 opacity-0"
          } transform transition duration-1000 ease-in-out
          text-3xl font-bold md:text-5xl`}
          >
            Hi!
            <br />
            It's me Peter.
          </h1>

          <h2
            className={`${
              !animated && "translate-y-10 opacity-0"
            }  text-2xl// text-xl xs:text-2xl      transform transition duration-1000 ease-in-out text-gray-500`}
          >
            I am
            <Typewriter
              words={[
                " <FrontEndDeveloper ‍💻 />",
                /* " <LookingForReactRole ⚛️ />", */
                " <SelfTaught 🤓 />",
                " Peter 😎",
              ]}
              //Control how many times to run. 0 | false to run infinitely
              loop={false}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <div
            className={`
          ${
            !animated && "translate-y-10 opacity-0"
          } transform transition duration-1000 ease-in-out
         `}
          >
            {socials?.map((social, i) => (
              <SocialIcon
                key={i}
                target="_blank"
                //url={social}
                url={social?.url}
                bgColor="transparent"
                fgColor="white"
                className="hover:opacity-70 opacity-80 !h-9 !w-9 "
              />
            ))}
          </div>
          <ScrollLink to="Work" smooth="true" offset={-40}>
            <button
              className={`${
                buttonIsPressed && "!bg-indigo-700/90 "
              } mt-3.5 mb-3 group relative hover:bg-indigo-600 bg-indigo-700 transition duration-200 ease-in py-3 px-10 rounded-xl focus:outline-none`}
              onMouseDown={() => setButtonIsPressed(true)}
              onMouseUpCapture={() => setButtonIsPressed(false)}
              onMouseLeave={() => setButtonIsPressed(false)}
            >
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
