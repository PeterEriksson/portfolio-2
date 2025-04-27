import Image from "next/image";

export default function Kicker() {
  return (
    <p
      className="hidden sm:inline whitespace-nowrap absolute -top-12 text-kicker
                 font-bold text-[#61DAFB]/90 tracking-wide"
    >
      React
      <span className="text-white/40">
        ing to Your UI Needs with
        <div className="inline-flex items-center space-x-2 opacity-70 ml-2 alignHorizontal: transform translate-y-1">
          <div className="relative group">
            <Image
              src="/react.png"
              alt="React.js icon"
              width={20}
              height={20}
              objectFit="contain"
              className=""
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8">
              React.js
            </div>
          </div>
          <div className="relative group">
            <Image
              src="/next.png"
              alt="Next.js icon"
              width={20}
              height={20}
              objectFit="contain"
              className=""
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8">
              Next.js
            </div>
          </div>

          <div className="relative group">
            <Image
              src="/typescript.png"
              alt="TypeScript icon"
              width={20}
              height={20}
              objectFit="cover"
              className="rounded-full"
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8">
              TypeScript
            </div>
          </div>

          <div className="relative group">
            <Image
              src="/tw.png"
              alt="Tailwind CSS icon"
              width={20}
              height={20}
              objectFit="contain"
              className=""
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-black text-white text-xs rounded px-2 py-1 -top-8">
              Tailwind CSS
            </div>
          </div>
        </div>
      </span>
    </p>
  );
}
