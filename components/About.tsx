import React from "react";
import { PageInfo } from "../typings";
import { motion } from "framer-motion";

type Props = {
  pageInfo?: PageInfo;
  backgroundInformation?: string;
};

export default function About({ backgroundInformation }: Props) {
  return (
    <div
      id="About"
      className="bg-gray-200 h-screen flex justify-center                      for-shape:-> relative ForRocket: overflow-hidden "
    >
      <div className="absolute space-y-2  text-center">
        <h1 className="text-5xl font-bold   mt-4">About</h1>
        <h4 className="sm:text-xl text-base font-extralight mb-3 ">
          Some info on me
        </h4>
      </div>
      <div className="w-10/12 bg-red-300/  flex items-center justify-between     ">
        {/* LEFT SIDE (TEXT) */}
        <div className="space-y-2">
          <h4 className="text-3xl font-semibold">
            Here is a{" "}
            <span className="underline decoration-red-500">little</span>{" "}
            background
          </h4>
          <p className="text-black sm:w-2/3 w-3/4 sm:text-base text-sm">
            {backgroundInformation}
          </p>
        </div>
        {/* RIGHT SIDE - containing profile pic */}
        <motion.img
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          whileInView={{
            opacity: 1,
          }}
          className=" sm:w-2/5  w-1/2    rounded-lg  max-w-xs "
          src="https://cdn.sanity.io/images/jnlncnhq/production/3930c81b37cc27edaabe4f67459336c4d28b52fb-401x522.png"
          alt=""
        />
      </div>
    </div>
  );
}