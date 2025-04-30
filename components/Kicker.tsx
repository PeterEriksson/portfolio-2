import Image from "next/image";
import { motion } from "framer-motion";

const techIcons = [
  {
    src: "/kicker-tech-icons/react.png",
    alt: "React.js icon",
    label: "React.js",
  },
  {
    src: "/kicker-tech-icons/next.png",
    alt: "Next.js icon",
    label: "Next.js",
  },
  {
    src: "/kicker-tech-icons/typescript.png",
    alt: "TypeScript icon",
    label: "TypeScript",
  },
  {
    src: "/kicker-tech-icons/tw.png",
    alt: "Tailwind CSS icon",
    label: "Tailwind CSS",
  },
];

export default function Kicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.7, delay: 1.2 }}
      whileInView={{ opacity: 0.7, y: 0 }}
      viewport={{ once: true }}
      className="hidden sm:inline whitespace-nowrap absolute -top-12 text-kicker
                 font-bold text-react/90 tracking-wide"
    >
      React
      <span className="text-white/40">
        ing to Your UI Needs with
        <div className="inline-flex items-center space-x-2 ml-2 transform translate-y-1">
          {techIcons.map(({ src, alt, label }, idx) => (
            <div key={idx} className="relative group">
              <Image
                src={src}
                alt={alt}
                width={20}
                height={20}
                objectFit="contain"
                className={"rounded-full"}
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8">
                {label}
              </div>
            </div>
          ))}
        </div>
      </span>
    </motion.div>
  );
}
